const express = require("express");
const controller = require('../controller/tarifController');

var tarifRouter = express.Router() ;
//const upload = uploadFileService.uploadMiddleFile();



//************CREATE CATEGORY********************
//auth.authmiddleware,
//upload.single('file'),
tarifRouter.post('/create',   controller.createTarif);
//**************************************** *//  

//************UPDATE CATEGORY********************
//auth.authmiddleware, upload.single('file'),
tarifRouter.patch('/update/:tarifId',  controller.updateTarif);
//**************************************** *// 

//************DELETE USER********************
//auth.authmiddleware,
tarifRouter.patch('/delete/:tarifId',  controller.deleteTarif);
//**************************************** *// 

//************GET A CATEGORY********************
tarifRouter.get('/fetch/one/:tarifId', controller.getTarif);
//**************************************** *// 

//************GET ALL CATEGORIES********************
//auth.authmiddleware,
tarifRouter.get("/fetch/all",  controller.getTarifs);
//**************************************** *//


//Export route to be used on another place
module.exports = tarifRouter;
