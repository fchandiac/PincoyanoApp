import moment from 'moment'


const records = require('@/services/records')

export default function useRecords() {

    const create = async (user_id, action, table, description) => {
        const record = await records.create(user_id, action, table, description)
        return record
    }

    const findAll = async () => {
        const record = await records.findAll()
        return record
    }

    const deleteFile = async (userId, fileName) => {
        const table = 'archivos'
        const action = 'eliminar'
        const description = `Elimina el archivo ${fileName} y todas las ventas asociadas.`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const createUser = async (userId, userName) => {
        const table = 'usuarios'
        const action = 'crear'
        const description = `Crea el usuario ${userName}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const createPrduct = async (userId, productName) => {
        const table = 'productos'
        const action = 'crear'
        const description = `Crea el producto ${productName}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const createCategory = async (userId, categoryName) => {
        const table = 'categorias'
        const action = 'crear'
        const description = `Crea la categoría ${categoryName}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const createSubCategory = async (userId, subCategoryName) => {
        const table = 'familias'
        const action = 'crear'
        const description = `Crea la familia ${subCategoryName}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const updateUser = async (userId, updateUserId) => {
        const table = 'usuarios'
        const action = 'actualizar'
        const description = `Actualiza el usuario ${updateUserId}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const updateCategory = async (userId, updateCategoryId) => {
        const table = 'categorias'
        const action = 'actualizar'
        const description = `Actualiza la categoría ${updateCategoryId}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const updateSubCategory = async (userId, updateSubCategoryId) => {
        const table = 'familias'
        const action = 'actualizar'
        const description = `Actualiza la familia ${updateSubCategoryId}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const updateProduct = async (userId, updateProductName) => {
        const table = 'productos'
        const action = 'actualizar'
        const description = `Actualiza el producto ${updateProductName}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const uploadFile = (userId, fileName) => {
        const table = 'archivos'
        const action = 'subir'
        const description = `Sube el archivo ${fileName}`
        const record = records.create(userId, action, table, description)
        return record
    }

    const destroySale = async (userId, date, total, fileName ) => {
        const table = 'ventas'
        const action = 'eliminar'
        const formattedDate = moment(date).format('DD-MM-YYYY')
        const fommatTotal = total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 }) 
        const description = `Elimina la venta del archivo ${fileName} con fecha ${formattedDate}, por un total de ${fommatTotal}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const destroyFile = async (userId, fileName) => {
        const table = 'archivos'
        const action = 'eliminar'
        const description = `Elimina el archivo ${fileName} y todas las ventas asociadas.`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const downloadFile = async (userId, fileName, date) => {
        const table = 'archivos'
        const action = 'descargar'
        const description = `Descarga el archivo ${fileName} con fecha ${moment(date).format('DD-MM-YYYY')}`
        const record = await records.create(userId, action, table, description)
        return record
    }

    const detroyUser = async (userId, deleteUserId) => {
        const table = 'usuarios'
        const action = 'eliminar'
        const description = `Elimina el usuario ${deleteUserId}`
        const record = await records.create(userId, action, table, description)
        return record
    }


    return {
        create,
        findAll,
        deleteFile,
        createPrduct,
        createCategory,
        createSubCategory,
        updateCategory,
        updateSubCategory,
        updateProduct,
        uploadFile,
        destroySale,
        destroyFile,
        downloadFile,
        createUser,
        updateUser,
        detroyUser

    }
 
}
