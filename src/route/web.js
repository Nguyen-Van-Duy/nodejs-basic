import express from "express";
import homeController from "../controller/homeController";
import multer from "multer";
import path from "path";
import appRoot from "app-root-path";

let router = express.Router();

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        // console.log(">>> check:", appRoot)
        cb(null,appRoot + '/src/public/image/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    console.log("sssssssssss", req)
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }

    // if (parseInt(req.headers['content-length']) > 500000) {
        
    //     return alert('dddddđ');
    // }
    cb(null, true);
};

// let maxSize = 500000

export const upload = multer({
    storage,
    // limits: { fileSize: 500000 },
    fileFilter: imageFilter
})

const initWebRoute = (app) => {
    router.get('/detail/user/:userId', homeController.getDetailPage)

    router.post('/create-user', homeController.createNewUser)

    router.post('/delete-user/:userId', homeController.deleteUser)

    router.get('/edit-user/:userId', homeController.getEditUser)

    router.post('/edit-user/:userId', homeController.postEditUser)

    router.get('/upload', homeController.uploadPage)

    router.post('/upload-profile-pic',upload.single('profile_pic'), homeController.handleUploadProfile)

    router.post('/upload-multiple-images',upload.array('multiple-images', 3), homeController.handleUploadmultipleImages)

    router.get('/', homeController.getHomePage)

    return app.use('/', router)
}

export default initWebRoute

