import { useAppContext } from '@/appProvider'
import CustomerGrid from '@/components/Grids/CustomersGrid/CustomerGrid'
import useCustomers from '@/components/Hooks/useCustomers'
import useSales from '@/components/Hooks/useSales'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'


export default function customers() {
  const { startDate, endDate } = useAppContext()
  const customers = useCustomers()
  const sales = useSales()
  const [totalSales, setTotalSales] = useState(0)
  const [customersList, setCustomersList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const customers_ = await sales.customersSalesBetweenDate(startDate, endDate)
      const formattedCustomers = customers_.map(customer => ({
        id: customer.customer_id,
        name: customer.Customer.name,
        amount: customer.total_sales,
        quanty: parseInt(customer.total_quanty)
      }))

      const totalSales_ = formattedCustomers.reduce((acc, curr) => acc + curr.amount, 0)
      setCustomersList(formattedCustomers)
      setTotalSales(totalSales_)
    }
    fetchData()
  }, [startDate, endDate])



  return (
    <>
      <CustomerGrid customersList={customersList} totalSales={totalSales} />
    </>
  )
}
