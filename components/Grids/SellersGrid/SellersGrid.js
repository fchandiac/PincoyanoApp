import { useAppContext } from '@/appProvider'
import useSales from '@/components/Hooks/useSales'
import InfoDataGrid from '@/components/Karmextron/InfoDataGrid'
import TemplateReport from '@/components/Reports/TemplateReport'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SellerReport from '@/components/Reports/SellerReport '



export default function SellersGrid(props) {
    const { sellersList, totalSales } = props
    const { startDate, endDate, setSellerReport } = useAppContext()
    const sales = useSales()
    const [gridApiRef, setGridApiRef] = useState(null)
    const [rowData, setRowData] = useState({ id: 0, code: 0, name: '' })


    useEffect(() => {
        const fetch = async () => {
            const salesBySeller_ = await sales.sellerReport(rowData.id, rowData.name, startDate, endDate)
            setSellerReport(salesBySeller_)
        }

        fetch()
    }, [rowData, startDate, endDate])

    const columns = [
        { field: 'id', headerName: 'Id', flex: 1, hide: true },
        { field: 'code', headerName: 'Código', flex: .5 },
        { field: 'name', headerName: 'Nombre', flex: 1 },
        {
            field: 'amount', headerName: 'Ventas', flex: .5,
            valueFormatter: (params) => params.value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })
        },
        {
            field: 'actions',
            headerName: '',
            headerClassName: 'data-grid-last-column-header',
            type: 'actions', flex: .3, getActions: (params) => [
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
                        rows={sellersList}
                        columns={columns}
                        title={'Ventas por vendedor del periodo'}
                        headerVariant={'h7'}
                        height={'78vh'}
                        setGridApiRef={setGridApiRef}
                        onRowSelected={setRowData}
                        info={'Ventas totales: ' + totalSales.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}
                    />
                </Grid>
                <Grid item xs={8}>
                    <SellerReport />
                </Grid>
            </Grid>

        </>
    )
}
