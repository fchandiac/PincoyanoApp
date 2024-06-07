import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import { Grid, Typography } from "@mui/material";
import TotalSalesCard from "@/components/Cards/TotalSalesCard";
import TotalUnitsCard from "@/components/Cards/TotalUnitsCard";
import TopPieChart from "@/components/Cards/TopPieChartCard/TopPieChart";
import SalesLineChartCard from "@/components/Cards/SalesLineChartCard";
import { useAppContext } from "@/appProvider";
import useSales from "@/components/Hooks/useSales";
import React, {useState, useEffect} from "react";
import CategoriesBarChart from "@/components/Cards/CategoriesBarChart";
import moment from "moment";






const inter = Inter({ subsets: ["latin"] })

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 },
];




export default function Home() {
  const { startDate, endDate} = useAppContext()
  const sales = useSales()
  const [salesToChart, setSalesToChart] = useState([])
  const [totalSalesAmount, setTotalSalesAmount] = useState(0)
  const [totalSalesQuanty, setTotalSalesQuanty] = useState(0)
  const [topProductsAmount, setTopProductsAmount] = useState([])
  const [topProductsUnits, setTopProductsUnits] = useState([])
  const [topSellers, setTopSellers] = useState([])
  const [categoryChartData, setCategoryChartData] = useState([])

  useEffect(() => {
    const fetch = async () => {

      const totalSalesAmount_ = await sales.totalSalesBetweenDate(startDate, endDate)
      setTotalSalesAmount(totalSalesAmount_)

       const totalSalesQuanty_ = await sales.totalUnitsBetweenDate(startDate, endDate)
      setTotalSalesQuanty(totalSalesQuanty_)

      const sales_ = await sales.salesToChartBetweenDate(startDate, endDate)

      setSalesToChart(sales_)


       const categoryChartData_ = await sales.findAllGroupByCategoryBetweenDates(startDate, endDate)
      const fomattedCategoryChartData = categoryChartData_.map((item) => ({
        categoryName: item.category_name,
        amount: item.total_sales
      }))
      setCategoryChartData(fomattedCategoryChartData)
     
     
      const topProductsAmount_ = await sales.dashBoardTopAmount(startDate, endDate)
      setTopProductsAmount(topProductsAmount_)

      const topProductsUnits_ = await sales.dashBoardTopQuanty(startDate, endDate)

      setTopProductsUnits(topProductsUnits_)
      const topSellers_ = await sales.dashBoardTopSellers(startDate, endDate)
      setTopSellers(topSellers_)

     
    
    }
    fetch()
  }, [startDate, endDate])



  return (
    <>
      <Grid>
        <Grid item>
          <Typography variant={'h5'}>Ventas del {moment(startDate).format('DD-MM-YYYY')} - {moment(endDate).format('DD-MM-YYYY')}</Typography>
        </Grid>
        <Grid item marginTop={1}>
          <Grid container spacing={1} direction={'row'}>
            <Grid item xs={8}>
              <TotalSalesCard title={'Total ventas'} amount={totalSalesAmount} />
            </Grid>
            <Grid item xs={4}>
              <TotalUnitsCard title={'Total unidades'} quanty={totalSalesQuanty} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item marginTop={1}>
          <CategoriesBarChart data={categoryChartData} title={'Ventas por categoría'} />

        </Grid>

        <Grid item marginTop={1}>
          <Grid container spacing={1} direction={'row'}>
            <Grid item xs={4}>
              <TopPieChart title={'Top 10 vendedores'} data={topSellers} />
            </Grid>
            <Grid item xs={4}>
              <TopPieChart title={'Top 10 monto'} data={topProductsAmount}/>
            </Grid>
            <Grid item xs={4}>
              <TopPieChart title={'Top 10  unidades'} data={topProductsUnits}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item marginTop={4}>
          <SalesLineChartCard title={'Ventas del periodo'} data={salesToChart}/>
        </Grid>
      </Grid>
    </>
  );
}
