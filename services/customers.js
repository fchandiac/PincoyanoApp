const server_url = process.env.API_URL


function create(name) {
    let data = {name }
    const customer_ = new Promise((resolve, reject) => {
        fetch(server_url + 'customers/create', {
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
    return customer_
}

function findAll() {
    const customer_ = new Promise((resolve, reject) => {
        fetch(server_url + 'customers/findAll', {
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
    return customer_
}

function findByName(name) {
    let data = { name }
    const customer_ = new Promise((resolve, reject) => {
        fetch(server_url + 'customers/findByName', {
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
    return customer_
}

export {
    create,
    findAll,
    findByName
}
