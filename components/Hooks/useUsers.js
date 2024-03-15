import React from 'react'
const users = require('@/services/users')

export default function useUsers() {

    const create = (user_name, name, pass) => {
        return users.create(user_name, name, pass)
    }

    const findAll = () => {
        const users_ = users.findAll()
        return users_
    }

    const findOneById = (id) => {
        return users.findOneById(id)
    }

    const findOneByUserName = (user_name) => {
        return users.findOneByUserName(user_name)
    }

    const update = (id, user_name, name) => {
        return users.update(id, user_name, name)
    }

    const destroy = (id) => {
        return users.destroy(id)
    }

    const login = (user_name, pass) => {
        const log = users.login(user_name, pass)
        return log
    }


    const updatePass = (id, pass, newPass) => {
        const user_ = users.updatePass(id, pass, newPass)
        return user_
    }

    return {
        create,
        findAll,
        findOneById,
        findOneByUserName,
        update,
        destroy,
        login,
        updatePass
    }
}
