const express = require("express");
const controller = require('../controller/eventController');
const uploadFileService = require('../services/uploadFile');
var eventRouter = express.Router() ;
const upload = uploadFileService.uploadMiddleFile();



//************CREATE CATEGORY********************
//auth.authmiddleware,
//upload.single('file'),
eventRouter.post('/create',   controller.createEvent);
//**************************************** *//  

//************UPDATE CATEGORY********************
//auth.authmiddleware, upload.single('file'),
eventRouter.patch('/update/:eventId',  controller.updateEvent);
//**************************************** *// 

//************DELETE USER********************
//auth.authmiddleware,
eventRouter.patch('/delete/:eventId',  controller.deleteEvent);
//**************************************** *// 

//************GET A CATEGORY********************
eventRouter.get('/fetch/one/:eventId', controller.getEvent);
//**************************************** *// 

//************GET ALL CATEGORIES********************
//auth.authmiddleware,
eventRouter.get("/fetch/all",  controller.getEvents);
//**************************************** *//


//Export route to be used on another place
module.exports = eventRouter;
