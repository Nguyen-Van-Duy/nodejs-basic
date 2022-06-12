import multer from 'multer'
import pool from '../configs/connectDB'

let getHomePage = async (req, res, next) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `users`')
    return res.render('index.ejs', {dataUser: rows})
        // res.json(results);
}

let handleUploadProfile = async (req, res, next) => {
    console.log('views .............', req.file)
    // 'profile_pic' is the name of our file input field in the HTML form

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // else if (req.file.size > 500000) {
        //     return res.send('file too largesss');
        // }

        // Display uploaded image for user validation
        res.json({image: `image/${req.file.filename}`})
        // res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
}



let uploadPage = async (req, res, next) => {
    return res.render('uploadFile.ejs')
}

let getDetailPage = async (req, res, next) => {
    
    const userId = req.params.userId
    const [user] = await pool.execute(`SELECT * FROM users where id = ?`, [userId])
    // return res.render('index.ejs', {dataUser: rows})
    return res.json(user)
        // res.json(results);
}

let createNewUser = async (req, res, next) => {

    console.log(req.body)
    let {firstName, lastName, email, address} = req.body;

    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address])
    return res.redirect('/')
}

let deleteUser = async (req, res, next) => {

    console.log(req.params.userId)
    const userId = req.params.userId
    await pool.execute(`delete from users where id = ?`, [userId])
    return res.redirect('/')
    // return res.json(user)
}

let getEditUser = async (req, res, next) => {

    console.log(req.params.userId)
    const userId = req.params.userId
    const [user] = await pool.execute(`SELECT * FROM users where id = ?`, [userId])
    console.log(user[0])
    // return res.redirect('/')
    return res.render('updateUser.ejs', {dataUser: user[0]})
}

let postEditUser = async (req, res, next) => {

    console.log(req.params.userId)
    const userId = req.params.userId
    let {firstName, lastName, email, address,} = req.body;
    await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?', [firstName, lastName, email, address, userId])
    return res.redirect('/')
}

let handleUploadmultipleImages = async (req, res, next) => {

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);

    
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditUser,
    postEditUser,
    uploadPage,
    handleUploadProfile,
    handleUploadmultipleImages,
}