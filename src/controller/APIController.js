import pool from '../configs/connectDB'

let getAllUsers = async (req, res, next) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `users`')
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res, next) => {

    let {firstName, lastName, email, address} = req.body;

    if( !firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'error!'
        })
    }

    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address])
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let updateUser = async (req, res, next) => { 
    const id = req.params.id
    let {firstName, lastName, email, address} = req.body;

    if( !firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'error!'
        })
    }

    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
     [firstName, lastName, email, address, id])

     return res.status(200).json({
        message: 'update',
    })
}

let deleteUser = async (req, res, next) => {
    const id = req.params.id

    if(!id) {
        return res.status(200).json({
            message: 'error!'
        })
    }

    await pool.execute(`delete from users where id = ?`, [id])

     return res.status(200).json({
        message: 'update',
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}