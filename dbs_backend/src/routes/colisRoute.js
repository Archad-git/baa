const express = require("express");
const controller = require('../controller/colisController');
const uploadFileService = require('../services/uploadFile');
var colisRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE CATEGORY********************
//auth.authmiddleware,
//upload.single('file'),
colisRouter.post('/create', upload.single('file'),  controller.createColis);
//**************************************** *//  

//************UPDATE CATEGORY********************
//auth.authmiddleware, upload.single('file'),
colisRouter.patch('/update/:colisId',upload.single('file'),  controller.updateColis);
//**************************************** *// 

//************UPDATE CATEGORY********************

colisRouter.patch('/updateValid/:colisId',  controller.updateValidColis);
//**************************************** *// 

//************DELETE USER********************
//auth.authmiddleware,
colisRouter.patch('/delete/:colisId',  controller.deleteColis);
//**************************************** *// 

//************GET A CATEGORY********************
colisRouter.get('/fetch/one/:colisId', controller.getColis);
//**************************************** *// 

//************GET ALL CATEGORIES********************
//auth.authmiddleware,
colisRouter.get("/fetch/all",  controller.getColiss);
//**************************************** *//


//Export route to be used on another place
module.exports = colisRouter;
