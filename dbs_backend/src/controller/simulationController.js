const simulationService = require('../services/simulationService');
//const api_consumer = require('../services/api_consumer');
const Event = require("../../src/models/event");
const cryptoJS = require("crypto-js");
const zlib = require('zlib');

//Create Simulation in Data Base
const createSimulation = async (req, res) =>{
    console.log("CREATE CONTROLLER");
    const body =req.body;
    
    try{
        
        console.log("#####################THE Simulation:");
        console.log(body);
       
        const simulationCreated = await simulationService.createSimulation(body);
        res.status(200).json({"message" : "Simulation created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating Simulation!!!"});
    };

}
//Get All simulations in Data Base
const getSimulation = async (req, res) =>{
    
    try{
        const simulations = await simulationService.getSimulations();
	 
        res.send(simulations);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Simulation not exist in DB!!!"});
    }
}
module.exports = {
    createSimulation,
    getSimulation,
  };