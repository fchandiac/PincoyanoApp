import React, { useState } from 'react'
import useSales from './useSales.js'
import { useAppContext } from '@/appProvider.js'
const sellers = require('../../services/sellers.js')



export default function useSellers() {
    const sales = useSales()
    const { startDate, endDate } = useAppContext()

    const create = async (code, name) => {
        const seller = await sellers.create(code, name)
        // console.log('Seller', seller)
        return seller
    }

    const findAll = async () => {
        const seller = await sellers.findAll()
        return seller
    }

    const findAllToGrid = async () => {
        const sellers_ = await sellers.findAll();
        const promises = sellers_.map(async (seller) => {
            const saleBySeller = await sales.findAllBySellerBetweenDate(seller.id, startDate, endDate)
            const totalSales = saleBySeller.reduce((acc, curr) => acc + curr.total, 0)

            return {
                id: seller.id,
                code: seller.code,
                name: seller.name,
                amount: totalSales
            };
        });

        const toGrid = await Promise.all(promises);
        return toGrid;
    }

    const findByName = async (name) => {
        const seller = await sellers.findByName(name)
        return seller
    }

    const importSeller = async (code, name) => {
        try {
            const seller = await sellers.create(code, name);
            // console.log('Newseller', seller);
            return seller;
        } catch (error) {
            const existingSeller = await sellers.findByName(name);
            if (existingSeller) {
                // console.log('ExistingSeller', existingSeller);
                return existingSeller;
            } else {
                console.log('Seller not found.');
                return null; // Devuelve null si el vendedor no se encuentra
            }
        }
    };

    return {
        create,
        findAll,
        findAllToGrid,
        findByName,
        importSeller
    }

}
