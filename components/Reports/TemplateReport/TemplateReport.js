import TotalSalesCard from '@/components/Cards/TotalSalesCard'
import TotalUnitsCard from '@/components/Cards/TotalUnitsCard'
import { Grid, IconButton, Paper, Stack, Typography, Box } from '@mui/material'
import React, {useRef} from 'react'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import TopPieChart from '@/components/Cards/TopPieChartCard/TopPieChart'
import SalesLineChartCard from '@/components/Cards/SalesLineChartCard'
import { useReactToPrint } from 'react-to-print'



export default function TemplateReport(props) {
    const { title } = props
    const printRef = useRef()
    const dataDefault = {
        totalSales: 0,
        totalUnits: 0,
        topProductsAmount: [],
        topProductsUnits: [],
        salesPerDay: []
    }
    

  


    const printReport = useReactToPrint({
        content: () => printRef.current,
    });
       


    return (
        <>

            <Paper variant='outlined' sx={{ padding: 2 }} ref={printRef} className='papper-print'>
                <Grid container spacing={1} direction={'column'}>
                    <Grid item>
                        <Box sx={{ textAlign: 'right', padding: 1 }} className="icono-imprimir">
                            <IconButton onClick={()=>{printReport()}}>
                                <LocalPrintshopIcon />
                            </IconButton>
                        </Box>
                        <Typography variant={'h5'}>{'Reporte ' + (title ? title : 'Title')}</Typography>
                    </Grid>
                    <Grid item >
                        <Grid container spacing={1} direction={'row'}>
                            <Grid item xs={12}>
                                <TotalSalesCard title={'Total ventas'} amount={dataDefault.totalSales} />
                            </Grid>
                            <Grid item xs={12}>
                                <TotalUnitsCard title={'Total unidades'} quanty={dataDefault.totalUnits} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1} direction={'row'}>
                            <Grid item xs={6}>
                                <TopPieChart data={dataDefault.topProductsAmount} />
                            </Grid>
                            <Grid item xs={6}>
                                <TopPieChart data={dataDefault.topProductsUnits} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <SalesLineChartCard data={dataDefault.salesPerDay} />
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
