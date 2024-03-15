import TotalSalesCard from "@/components/Cards/TotalSalesCard";
import TotalUnitsCard from "@/components/Cards/TotalUnitsCard";
import { Grid, IconButton, Paper, Stack, Typography, Box } from "@mui/material";
import React, { useRef } from "react";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import TopPieChart from "@/components/Cards/TopPieChartCard/TopPieChart";
import SalesLineChartCard from "@/components/Cards/SalesLineChartCard";
import { useReactToPrint } from "react-to-print";
import { useAppContext } from "@/appProvider";
import CategoriesBarChart from "@/components/Cards/CategoriesBarChart";
import moment from "moment";

export default function SellerReport(props) {
  const { sellerReport, startDate, endDate } = useAppContext();

  const printRef = useRef();

  const printReport = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      <Paper
        variant="outlined"
        sx={{ padding: 2 , paddingBottom: 4}}
        ref={printRef}
        className="papper-print"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{ textAlign: "right", padding: 1 }}
              className="icono-imprimir"
            >
              <IconButton
                onClick={() => {
                  printReport();
                }}
              >
                <LocalPrintshopIcon />
              </IconButton>
            </Box>
            <Typography variant={"h5"}>{sellerReport.title}</Typography>
            <Typography variant={"h6"}>Periodo: {moment(startDate).format('DD-MM-YYYY') + ' - ' + moment(endDate).format('DD-MM-YYYY')}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TotalSalesCard
                  title={"Ventas Totales"}
                  amount={sellerReport.totalSales}
                />
              </Grid>
              <Grid item xs={4}>
                <TotalUnitsCard
                  title={"Unidades vendidas"}
                  quanty={sellerReport.totalUnits}
                />
              </Grid>
              <Grid item xs={4}>
                <TotalUnitsCard
                  title={"Clientes atentidos"}
                  quanty={sellerReport.customers}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CategoriesBarChart
              data={sellerReport.categoriesSales}
              title={"Ventas por categoría"}
            />
          </Grid>
          <Grid item xs={12} marginTop={2} className="break-after">
            <SalesLineChartCard
              data={sellerReport.salesPerDay}
              title={"Ventas por día"}
            />
          </Grid>

          <Grid item xs={6}>
            <TopPieChart
              data={sellerReport.topProductsAmount}
              title={"Productos más vendidos por monto"}
            />
          </Grid>
          <Grid item xs={6}>
            <TopPieChart
              data={sellerReport.topProductsUnits}
              title={"Productos más vendidos por unidades"}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
