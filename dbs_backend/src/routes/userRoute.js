const express = require("express");
const controller = require('../controller/userController');

const uploadFileService = require('../services/uploadFile');
const auth = require('../middlewares/authmiddleware');
const authenfication = require('../controller/auth/authentification');

var userRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();


//************LOGIN ROUTE********************
userRouter.post("/login", authenfication.login);

//************CREATE CATEGORY********************
//auth.authmiddleware,
//upload.single('file'),
userRouter.post('/create',   controller.createUser);
//**************************************** *//  

//************UPDATE CATEGORY********************
//auth.authmiddleware, upload.single('file'),
userRouter.patch('/update/:userId',  controller.updateUser);
//**************************************** *// 

//************DELETE USER********************
//auth.authmiddleware,
userRouter.patch('/delete/:userId',  controller.deleteUser);
//**************************************** *// 

//************GET A CATEGORY********************
userRouter.get('/fetch/one/:userId', controller.getUser);
//**************************************** *// 

//************GET ALL CATEGORIES********************
//auth.authmiddleware,
userRouter.get("/fetch/all",  controller.getUsers);
//**************************************** *//

//************GET ALL CATEGORIES********************
userRouter.post("/recover", controller.recoverPassword);
//**************************************** *//

//Export route to be used on another place
module.exports = userRouter;
