
const server_url = process.env.API_URL



function create(invoice, quanty, price, discount, return_, total_return, total_sale, total, product_id, customer_id, seller_id, date, file_id) {
    let data = { invoice, quanty, price, discount, return_, total_return, total_sale, total, product_id, customer_id, seller_id, date, file_id }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function findAll() {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAll', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function findAllbetweenDate(start, end) {
    let data = { start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllbetweenDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function findAllBySellerBetweenDate(seller_id, start, end) {
    let data = { seller_id, start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllBySellerBetweenDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function findAllByCustomerBetweenDate(customer_id, start, end) {
    let data = { customer_id, start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllByCustomerBetweenDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}


function totalSalesBetweenDate(start, end) {
    let data = { start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/totalSalesBetweenDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
    
}

function totalQuantyBetweenDate(start, end) {
    let data = { start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/totalQuantyBetweenDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
    
}



function findAllByProductBetweenDate(productId, start, end) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllByProductBetweenDate', {
            method: 'POST',
            body: JSON.stringify({ productId, start, end }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}



function findAllSoldProductsBetweenDates(startDate, endDate) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllSoldProductsBetweenDates', {
            method: 'POST',
            body: JSON.stringify({ startDate, endDate }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}


function customersSalesBetweenDate(start, end) {
    let data = { start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/customersSalesBetweenDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}



function findAllBySellerGroupByCategoryBetweenDate(seller_id, start, end) {
    let data = { seller_id, start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllBySellerGroupByCategoryBetweenDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}




function findAllGroupByCategoryBetweenDates(startDate, endDate) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllGroupByCategoryBetweenDates', {
            method: 'POST',
            body: JSON.stringify({ startDate, endDate }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}


function totalSalesByProductBetweenDates(product_id, startDate, endDate) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/totalSalesByProductBetweenDates', {
            method: 'POST',
            body: JSON.stringify({ product_id, startDate, endDate }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function totalQuantyByProductBetweenDates(product_id, startDate, endDate) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/totalQuantyByProductBetweenDates', {
            method: 'POST',
            body: JSON.stringify({ product_id, startDate, endDate }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function findAllByProductBetweenDateGroupByDate(product_id, startDate, endDate) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllByProductBetweenDateGroupByDate', {
            method: 'POST',
            body: JSON.stringify({ product_id, startDate, endDate }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function totalSalesByCustomerBetweenDates(customer_id, startDate, endDate) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/totalSalesByCustomerBetweenDates', {
            method: 'POST',
            body: JSON.stringify({ customer_id, startDate, endDate }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function totalQuantyByCustomerBetweenDates(customer_id, startDate, endDate) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/totalQuantyByCustomerBetweenDates', {
            method: 'POST',
            body: JSON.stringify({ customer_id, startDate, endDate }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function findAllByCustomerBetweenDateGroupByDate(customer_id, startDate, endDate) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllByCustomerBetweenDateGroupByDate', {
            method: 'POST',
            body: JSON.stringify({ customer_id, startDate, endDate }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}


function findAllByCustomerBetweenDateGroupByCategory(customer_id, startDate, endDate) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllByCustomerBetweenDateGroupByCategory', {
            method: 'POST',
            body: JSON.stringify({ customer_id, startDate, endDate }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function destroy(id) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/destroy', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res)
                } else {
                    resolve(res)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}


function destroyAllByFile(file_id) {
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/destroyAllByFile', {
            method: 'POST',
            body: JSON.stringify({ file_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res)
                } else {
                    resolve(res)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
}

function findAllBetweenDateToDataGrid(start, end){
    let data = { start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/findAllBetweenDateToDataGrid', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res)
                } else {
                    resolve(res)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_

}

  //  function totalSalesBetweenDate(start, end) 

 
//function totalUnitsBetweenDate(start, end)

function totalUnitsBetweenDate(start, end) {
    let data = { start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/totalUnitsBetweenDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_
    
}

//  function salesToChartBetweenDate(start, end)

function salesToChartBetweenDate(start, end) {
    let data = { start, end }
    const sale_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sales/salesToChartBetweenDate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res)
                } else {
                    resolve(res)
                }
            })
        }).catch(err => {
            reject(err)
        })
    })
    return sale_

}


export { 
    create, 
    findAll, 
    findAllbetweenDate, 
    findAllBySellerBetweenDate, 
    findAllByCustomerBetweenDate, 
    totalSalesBetweenDate,
    totalQuantyBetweenDate,
    findAllByProductBetweenDate,
    findAllSoldProductsBetweenDates,
    customersSalesBetweenDate,
    findAllBySellerGroupByCategoryBetweenDate,
    findAllGroupByCategoryBetweenDates,
    totalSalesByProductBetweenDates,
    totalQuantyByProductBetweenDates,
    findAllByProductBetweenDateGroupByDate,
    totalSalesByCustomerBetweenDates,
    totalQuantyByCustomerBetweenDates,
    findAllByCustomerBetweenDateGroupByDate,
    findAllByCustomerBetweenDateGroupByCategory,
    destroy,
    destroyAllByFile,
    findAllBetweenDateToDataGrid,
    totalUnitsBetweenDate,
    salesToChartBetweenDate
   

}