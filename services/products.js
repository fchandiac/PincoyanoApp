const server_url = process.env.API_URL


function create(code, name, subcategory_id) {
    let data = { code, name, subcategory_id}
    const product_ = new Promise((resolve, reject) => {
        fetch(server_url + 'products/create', {
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
    return product_
}

function findAll() {
    const product_ = new Promise((resolve, reject) => {
        fetch(server_url + 'products/findAll', {
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
    return product_
}

function findOneByName(name) {
    let data = { name }
    const product_ = new Promise((resolve, reject) => {
        fetch(server_url + 'products/findOneByName', {
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
    return product_
}


function update(id, code, name, subcategory_id) {
    let data = { id, code, name, subcategory_id}
    const product_ = new Promise((resolve, reject) => {
        fetch(server_url + 'products/update', {
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
    }
    )
    return product_
}

export {
    create,
    findAll,
    findOneByName,
    update
}