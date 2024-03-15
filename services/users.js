const server_url = process.env.API_URL



function create(user_name, name, pass) {
    let data = { user_name, name, pass }
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/create', {
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
    return user_
}

function findAll() {
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/findAll', {
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
    return user_
}

function findOneById(id) {
    let data = { id }
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/findOneById', {
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
    return user_
}

function findOneByUserName(user_name) {
    let data = { user_name }
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/findOneByUserName', {
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
    return user_
}

function update(id, user_name, name) {
    let data = { id, user_name, name }
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/update', {
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
    return user_
}

function destroy(id) {
    let data = { id }
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/destroy', {
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
    return user_
}

function login(user_name, pass){
    let data = { user_name, pass }
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/login', {
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
    return user_
}

function updatePass(id, pass, newPass){
    let data = { id, pass, newPass }
    const user_ = new Promise((resolve, reject) => {
        fetch(server_url + 'users/updatePass', {
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
    return user_

}

export {
    create,
    findAll,
    findOneById,
    findOneByUserName,
    update,
    destroy,
    login,
    updatePass
}