import useSales from '@/components/Hooks/useSales'
import InfoDataGrid from '@/components/Karmextron/InfoDataGrid'
import { Grid } from '@mui/material'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { GridActionsCellItem } from '@mui/x-data-grid'
import AssessmentIcon from '@mui/icons-material/Assessment'
import ProductReport from '@/components/Reports/ProductReport'
import { useAppContext } from '@/appProvider'



export default function ProductsGrid(props) {
    const { productsList, totalSales } = props
    const sales = useSales();
    const { startDate, endDate, setProductReport } = useAppContext()
    const [gridApiRef, setGridApiRef] = useState(null)
    const [rowData, setRowData] = useState({ id: 0, code: 0, name: '' })

    useEffect(() => {
         const fetch = async () => {
            const reportData = await sales.productReport(rowData.id, rowData.name, startDate, endDate)
            setProductReport(reportData)
        }
        if (rowData.id !== 0) {
            fetch()
        }
    }, [rowData, startDate, endDate])


    const columns = [
        { field: 'id', headerName: 'Id', flex: .5, hide: true },
        { field: 'code', headerName: 'Código', flex: .6 },
        { field: 'name', headerName: 'Nombre', flex: .8 },
        {
            field: 'amount', headerName: 'Ventas', flex: .5,
            valueFormatter: (params) => params.value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })
        },
        {
            field: 'actions',
            headerName: '',
            headerClassName: 'data-grid-last-column-header',
            type: 'actions', flex: .2, getActions: (params) => [
                <GridActionsCellItem
                    icon={<AssessmentIcon />}
                    label={'Ver'}
                    onClick={() => {
                        setRowData({
                            id: params.row.id,
                            code: params.row.code,
                            name: params.row.name
                        })
                    }}
                />,
            ],
        }
    ]


    return (
        <>
            <Grid container spacing={2} direction={'row'}>
                <Grid item xs={4}>
                    <InfoDataGrid
                        rows={productsList}
                        columns={columns}
                        title={'Ventas por producto del periodo'}
                        headerVariant={'h7'}
                        height={'78vh'}
                        setGridApiRef={setGridApiRef}
                        onRowSelected={setRowData}
                        info={'Ventas totales: ' + totalSales.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}
                    />
                </Grid>
                <Grid item xs={8}>
                    <ProductReport />

                </Grid>
            </Grid>

        </>
    )
}
