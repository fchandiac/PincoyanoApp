import React from 'react'
import useSales from './useSales.js'
import { useAppContext } from '@/appProvider.js'
const products = require('../../services/products.js')




export default function useProducts() {
    const sales = useSales()
    const { startDate, endDate } = useAppContext()

    const create = async (code, name, subcategoryId) => {
        const product = await products.create(code, name, subcategoryId)
        return product
    }

    const findAll = async () => {
        const product = await products.findAll()
        return product
    }

    const findOneByName= async (name) => {
        const product = await products.findOneByName(name)
        return product
    }


    const importProduct = async (code, name) => {
        try {
            const product = await products.create(code, name, 1001);
            return product;
        } catch (error) {
            const existingProduct = await products.findOneByName(name);
            if (existingProduct) {
                return existingProduct;
            } else {
                console.log('Product not found.');
                return null; // Devuelve null si el producto no se encuentra
            }
        }
    }

   
    const findAllToGrid = async () => {
        const products_ = await products.findAll();
        const promises = products_.map(async (product) => {
            const saleByProduct = await sales.findAllByProductBetweenDate(product.id, startDate, endDate)
            const totalSales = saleByProduct.reduce((acc, curr) => acc + curr.total, 0)

            return {
                id: product.id,
                code: product.code,
                name: product.name,
                amount: totalSales
            };
        });

        const toGrid = await Promise.all(promises);
        return toGrid;
    }

    const findAllToAllGrid = async () => {
        const products_ = await products.findAll();
        const formatted = products_.map((p) => ({
            id: p.id,
            code: p.code,
            name: p.name,
            subcategory: p.Subcategory == null ? '':{id: p.Subcategory.id, key: p.Subcategory.id, name: p.Subcategory.name},
            subcategoryId: p.Subcategory == null? '': p.Subcategory.id,
            subcategoryName: p.Subcategory == null ? '': p.Subcategory.name,
            category: p.Subcategory == null ? '': {id: p.Subcategory.Category.id, key: p.Subcategory.Category.id, name: p.Subcategory.Category.name},
            categoryId: p.Subcategory== null ? '': p.Subcategory.Category.id,
            categoryName: p.Subcategory == null ? '': p.Subcategory.Category.name
        }));
        

        return formatted;
    }


        const update = async (id, code, name, subcategory_id) => {
            const product = await products.update(id, code, name, subcategory_id);
            return product
        }


    return {
        create,
        findAll,
        findOneByName,
        importProduct,
        findAllToGrid,
        findAllToAllGrid,
        update
    }
 
}


