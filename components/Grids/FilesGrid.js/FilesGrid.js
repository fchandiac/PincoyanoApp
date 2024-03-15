import React, { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import InfoDataGrid from "@/components/Karmextron/InfoDataGrid";
import useFiles from "@/components/Hooks/useFiles";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Dialog, Grid, Typography, Button } from "@mui/material";
import useSales from "@/components/Hooks/useSales";
import useRecords from "@/components/Hooks/useRecords";
import { useAppContext } from "@/appProvider";
import { saveAs } from "file-saver";
const server_url = process.env.API_URL;

export default function FilesGrid() {
  const { user, openSnack } = useAppContext();
  const [gridApiRef, setGridApiRef] = useState(null);
  const files = useFiles();
  const sales = useSales();
  const records = useRecords();
  const [filesList, setFilesList] = useState([]);
  const [rowData, setRowData] = useState({ id: 0, name: "", description: "" });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await files.findAll();
      const formattedData = data.map((file) => {
        return {
          id: file.id,
          name: file.name,
          description: file.description,
          userName: file.User ? file.User.name : "",
          cratedAt: file.createdAt,
        };
      });
      setFilesList(formattedData);
    };
    fetch();
  }, []);

  const columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "name", headerName: "Nombre", flex: 2 },
    {
      field: "description",
      headerName: "Descripción",
      flex: 2,
    },
    {
      field: "userName",
      headerName: "Funcionario",
      flex: 2,
    },
    {
      field: "cratedAt",
      headerName: "Fecha de creación",
      flex: 2,
      headerClassName: "data-grid-last-column-header",
      valueFormatter: (params) => {
        return moment(params.value).format("DD-MM-YYYY HH:mm");
      },
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.5,
      headerClassName: "data-grid-last-column-header",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label={"destroy"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              userName: params.row.user_name,
              name: params.row.name,
            });
            setOpenDeleteDialog(true);
          }}
        />,
        <GridActionsCellItem
          icon={<FileDownloadIcon />}
          label={"download"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              userName: params.row.user_name,
              name: params.row.name,
              cratedAt: params.row.cratedAt,
            });
            downloadFile();
          
          }}
        />,
      ],
    },
  ];

  const destroyFile = async () => {
    try {
      await files.deleteFile(rowData.name);
      await sales.destroyAllByFile(rowData.id);
      await files.destroy(rowData.id);
      gridApiRef.current.updateRows([{ id: rowData.id, _action: "delete" }]);
      await records.destroyFile(user.id, rowData.name);
      openSnack("Archivo eliminado", "success");
      setRowData({ id: 0, name: "", description: "" });
      setOpenDeleteDialog(false);
    } catch (error) {
      console.log(error);
      openSnack("Error al eliminar el archivo", "error");
    }
  };

  const downloadFile = async () => {
    const fileUrl = server_url + "/plantilla.xlsx";
    saveAs(fileUrl, rowData.name);
    await records.downloadFile(user.id, rowData.name, rowData.cratedAt);

  }


  return (
    <>
      <InfoDataGrid
        title={"Archivos"}
        rows={filesList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth={"sm"}
        fullWidth
      >
        <Grid container spacing={1} direction={"column"} padding={1}>
          <Grid item>
            <Typography variant="h5">
              Eliminar archivo {rowData.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              ¿Está seguro que desea eliminar el archivo?
            </Typography>
            <Typography variant="caption">
              Será eliminado el archivo y todas las ventas asociadas.
            </Typography>
          </Grid>
          <Grid item textAlign={"right"}>
            <Button
              variant="contained"
              onClick={() => {
                destroyFile();
              }}
            >
              Eliminar
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
