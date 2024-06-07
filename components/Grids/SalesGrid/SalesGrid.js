import { useAppContext } from "@/appProvider";
import useSales from "@/components/Hooks/useSales";
import InfoDataGrid from "@/components/Karmextron/InfoDataGrid";
import moment from "moment";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Dialog, Grid, Typography, Button } from "@mui/material";
import useRecords from "@/components/Hooks/useRecords";

export default function SalesGrid() {
  const { startDate, endDate, user } = useAppContext();
  const sales = useSales();
  const records = useRecords();
  const [gridApiRef, setGridApiRef] = useState(null);
  const [salesList, setSalesList] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [rowData, setRowData] = useState({ id: 0, total: 0, fileName: "" });

  useEffect(() => {
    const fetch = async () => {
      const salesList_ = await sales.findAllbetweenDateToGrid(
        startDate,
        endDate
      );
      setSalesList(salesList_.data);

      const total = await sales.totalSalesBetweenDate(startDate, endDate);
      setTotalSales(total);
    
    };
    fetch();
  }, [startDate, endDate]);

  const columns = [
    { field: "id", headerName: "Id", flex: 0.6, hide: true },
    { field: "fileName", headerName: "Archivo", flex: 1.2 },
    { field: "sellerName", headerName: "Vendedor", flex: 1 },
    { field: "customerName", headerName: "Cliente", flex: 1 },
    { field: "productName", headerName: "Producto", flex: 1.2 },
    { field: "quanty", headerName: "Cantidad", flex: 0.6 },
    { field: "discount", headerName: "Descuento", flex: 0.8 },
    {
      field: "price",
      headerName: "Precio",
      flex: 0.8,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        }),
    },
    { field: "total_sale", headerName: "Total Venta", flex: 0.8 },
    { field: "total_return", headerName: "Total Devolución", flex: 1 },
    {
      field: "total",
      headerName: "Total",
      flex: 0.8,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        }),
    },
    {
      field: "date",
      headerName: "Fecha",
      flex: 0.8,
      valueFormatter: (params) => moment(params.value).format("DD-MM-YYYY"),
      headerClassName: "data-grid-last-column-header",
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.4,
      headerClassName: "data-grid-last-column-header",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label={"destroy"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              total: params.row.total,
              fileName: params.row.fileName,
              date: params.row.date,
            });
            setOpenDeleteDialog(true);
          }}
        />,
      ],
    },
  ];

  const destroySale = async () => {
    try {
      const result = await sales.destroy(rowData.id);
      if (result) {
        setRowData({ id: 0, total: 0, fileName: "", date:'' });
        gridApiRef.current.updateRows([{ id: rowData.id, _action: "delete" }]);
        setOpenDeleteDialog(false);
        await records.destroySale(user.id, rowData.date, rowData.total, rowData.fileName)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <InfoDataGrid
        rows={salesList}
        columns={columns}
        title={
          "Ventas " +
          moment(startDate).format("DD-MM-YYYY") +
          " - " +
          moment(endDate).format("DD-MM-YYYY")
        }
        headerVariant={"h6"}
        height={"78vh"}
        setGridApiRef={setGridApiRef}
        info={
          "Ventas totales del periodo: " +
          totalSales.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0,
          })
        }
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullWidth
        maxWidth={"xs"}
      >
        <Grid container spacing={1} direction={"column"} p={1}>
          <Grid item>
            <Typography variant={"h5"}>Eliminar Venta</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body1"}>
              ¿Estás seguro de eliminar venta con total:{" "}
              {rowData.total.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0,
              })}
              ?
            </Typography>
          </Grid>
          <Grid item textAlign={"right"}>
            <Button variant="contained" color="primary" onClick={() => {destroySale()}}>
              Eliminar
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
