const express = require("express");
const controller = require('../controller/simulationController');
var simulationRouter = express.Router() ;



//************CREATE CATEGORY********************
//auth.authmiddleware,
//upload.single('file'),
simulationRouter.post('/create',   controller.createSimulation);
//**************************************** *//  

//************GET ALL CATEGORIES********************
//auth.authmiddleware,
simulationRouter.get("/fetch/all",  controller.getSimulation);
//**************************************** *//

//Export route to be used on another place
module.exports = simulationRouter;
