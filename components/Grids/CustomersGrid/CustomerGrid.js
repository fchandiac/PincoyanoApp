import { useAppContext } from "@/appProvider";
import useSales from "@/components/Hooks/useSales";
import InfoDataGrid from "@/components/Karmextron/InfoDataGrid";
import { Grid } from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CustomerReport from "@/components/Reports/CustomerReport";

export default function CustomerGrid(props) {
  const { customersList, totalSales } = props;
  const { setCustomerReport, startDate, endDate } = useAppContext();
  const sales = useSales();
  const [gridApiRef, setGridApiRef] = useState(null);
  const [rowData, setRowData] = useState({ id: 0, code: 0, name: "" });

  useEffect(() => {
    const fetch = async () => {
      const report = await sales.customerReport(
        rowData.id,
        rowData.name,
        startDate,
        endDate
      );
      setCustomerReport(report);
    };
    if (rowData.id > 0) fetch();
  }, [rowData, startDate, endDate]);

  const columns = [
    { field: "id", headerName: "Id", flex: 1, hide: true },
    { field: "name", headerName: "Nombre", flex: 1 },
    {
      field: "amount",
      headerName: "Ventas",
      flex: 0.5,
      valueFormatter: (params) =>
        params.value.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        }),
    },
    {
      field: "actions",
      headerName: "",
      headerClassName: "data-grid-last-column-header",
      type: "actions",
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<AssessmentIcon />}
          label={"Ver"}
          onClick={() => {
            setRowData({
              id: params.row.id,
              code: params.row.code,
              name: params.row.name,
            });
          }}
        />,
      ],
    },
  ];

  return (
    <>
      <Grid container spacing={2} direction={"row"}>
        <Grid item xs={4}>
          <InfoDataGrid
            rows={customersList}
            columns={columns}
            title={"Ventas por cliente del periodo"}
            headerVariant={"h7"}
            height={"78vh"}
            setGridApiRef={setGridApiRef}
            onRowSelected={setRowData}
            info={
              "Ventas totales: " +
              totalSales.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
                minimumFractionDigits: 0,
              })
            }
          />
        </Grid>
        <Grid item xs={8}>
          <CustomerReport />
        </Grid>
      </Grid>
    </>
  );
}
