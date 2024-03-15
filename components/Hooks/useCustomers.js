import React from 'react'
import useSales from './useSales.js'
import { useAppContext } from '@/appProvider.js'
const customers = require('../../services/customers.js')



export default function useCustomers() {
    const { startDate, endDate } = useAppContext()  
    const sales = useSales()

    const create = async (name) => {
        const customer = await customers.create(name)
        return customer
    }

    const findAll = async () => {
        const customer = await customers.findAll()
        return customer
    }

    const findByName = async (name) => {
        const customer = await customers.findByName(name)
        // console.log('Customer', customer)
        return customer
    }

 
    const importCustomer = async (name) => {
        try {
            const customer = await customers.create(name);
            // console.log('NewCustomer', customer);
            return customer;
        } catch (error) {
            const existingCustomer = await customers.findByName(name);
            if (existingCustomer) {
                // console.log('ExistingCustomer', existingCustomer);
                return existingCustomer;
            } else {
                console.log('Customer not found.');
                return null; // Devuelve null si el cliente no se encuentra
            }
        }
    }

    const findAllToGrid = async () => {
        const customers_ = await customers.findAll()
        const promises = customers_.map(async (customer) => {
            // const saleByCustomer = await sales.findAllByCustomerBetweenDate(customer.id, startDate, endDate)
            // console.log('SaleByCustomer', saleByCustomer)
            // const totalSales = saleByCustomer.reduce((acc, curr) => acc + curr.total, 0)
            return {
                id: customer.id,
                code: customer.code,
                name: customer.name,
                amount: 0
            };
        });

        const toGrid = await Promise.all(promises);
        return toGrid;
    }

    return {
        create,
        findAll,
        findByName,
        importCustomer,
        findAllToGrid
    }


  
}


// const customer = await customers.findByName(name)
// if (customer.length === 0) {
//     const customer_ = await customers.create(code, name)
//     console.log('Create customer: ', name)
//     return customer_
// }
// console.log('Find customer: ', name)
// return customer
