import { useAppContext } from "@/appProvider";
import InfoDataGrid from "@/components/Karmextron/InfoDataGrid";
import { Button, Dialog, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import useUsers from "@/components/Hooks/useUsers";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UserForm from "@/components/Forms/UserForm";
import useRecords from "@/components/Hooks/useRecords";

export default function UsersGrid(props) {
  const { update } = props;
  const [gridApiRef, setGridApiRef] = useState(null);
  const users = useUsers();
  const records = useRecords();
  const [rowData, setRowData] = useState({ id: 0, userName: "", name: "" });
  const { openSnack, user } = useAppContext();
  const [usersList, setUsersList] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fecth = async () => {
      const data = await users.findAll();
      setUsersList(data);
    };
    fecth();
  }, [update]);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.5 },
    { field: "user_name", headerName: "Usuario", flex: 1.5 },
    {
      field: "name",
      headerName: "Nombre",
      flex: 1.5,
    },

    {
      field: "actions",
      headerName: "",
      flex: 1,
      headerClassName: "data-grid-last-column-header",
      type: "actions",
      flex: 0.6,
      getActions: (params) => [
        <GridActionsCellItem
          disabled={params.row.user_name === "admin" ? true : false}
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
          disabled={params.row.user_name === "admin" ? true : false}
          icon={<EditIcon />}
          label={"edit"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              userName: params.row.user_name,
              name: params.row.name,
              password: "",
            });
            setOpenEditDialog(true);
          }}
        />,
      ],
    },
  ];

  const destroyUser = async () => {
    try {
      const result = await users.destroy(rowData.id);
      if (result) {
        await records.detroyUser(user.id, rowData.id);
        openSnack("Usuario eliminado", "success");
        setRowData({ id: 0, userName: "", name: "" });
        gridApiRef.current.updateRows([{ id: rowData.id, _action: "delete" }]);
        setOpenDeleteDialog(false);
      }
    } catch (err) {
      openSnack(err.errors[0].message, "error");
    }
  };

  const afterUpdate = (data) => {
    gridApiRef.current.updateRows([
      { id: data.id, name: data.name, user_name: data.userName },
    ]);
    setOpenEditDialog(false);
  };

  return (
    <>
      <InfoDataGrid
        title={"Usuarios"}
        rows={usersList}
        columns={columns}
        setGridApiRef={setGridApiRef}
        height={"80vh"}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullWidth
        maxWidth={"xs"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            destroyUser();
          }}
        >
          <Grid container spacing={1} direction={"column"} p={1}>
            <Grid item>
              <Typography variant={"h5"}>Eliminar usuario</Typography>
            </Grid>
            <Grid item>
              <Typography variant={"body1"}>
                ¿Estás seguro de eliminar el usuario {rowData.userName}?
              </Typography>
            </Grid>
            <Grid item textAlign={"right"}>
              <Button type="submit" variant="contained" color="primary">
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth={"xs"}
      >
        <UserForm data={rowData} edit={true} afterSubmit={afterUpdate} />
      </Dialog>
    </>
  );
}
