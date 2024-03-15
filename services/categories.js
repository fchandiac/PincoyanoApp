const server_url = process.env.API_URL

function create(name, description) {
    let data = { name, description }
    const category_ = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/create', {
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
    return category_
}

function findAll() {
    const category_ = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/findAll', {
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
    return category_
}

function findOneById(id) {
    let data = { id }
    const category_ = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/findOneById', {
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
    return category_
}

function findOneByName(name) {
    let data = { name }
    const category_ = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/findOneByName', {
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
    return category_
}

function update(id, name, description) {
    let data = { id, name, description }
    const category_ = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/update', {
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
    return category_
}

function destroy(id) {
    let data = { id }
    const category_ = new Promise((resolve, reject) => {
        fetch(server_url + 'categories/destroy', {
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
    return category_
}

export {
    create,
    findAll,
    findOneById,
    update,
    destroy,
    findOneByName
}