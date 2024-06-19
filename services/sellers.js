const server_url = process.env.API_URL


function create(code, name) {
    let data = { code, name }
    const seller_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sellers/create', {
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
    return seller_
}

function findAll() {
    const seller_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sellers/findAll', {
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
    return seller_
}


function findByName(name) {
    let data = { name }
    const seller_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sellers/findByName', {
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
    return seller_
}

function findByCode(code){
    let data = { code }
    const seller_ = new Promise((resolve, reject) => {
        fetch(server_url + 'sellers/findByCode', {
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
    return seller_
}

export { create, findAll, findByName, findByCode }
