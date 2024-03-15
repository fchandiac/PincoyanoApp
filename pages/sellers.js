import { useAppContext } from '@/appProvider'
import SellersGrid from '@/components/Grids/SellersGrid'
import useSellers from '@/components/Hooks/useSellers'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'



export default function sellers() {
    const { startDate, endDate } = useAppContext()
    const sellers = useSellers()
    const [sellersList, setSellersList] = useState([])
    const [totalSales, setTotalSales] = useState(0)

    useEffect(() => {
        const fecth = async () => {
            const sellersList = await sellers.findAllToGrid()
            setSellersList(sellersList)
            setTotalSales(sellersList.reduce((acc, curr) => acc + curr.amount, 0))
        }
        fecth()
    }, [startDate, endDate])


    return (
        <>

            <SellersGrid sellersList={sellersList}  totalSales={totalSales}/>


        </>
    )
}
