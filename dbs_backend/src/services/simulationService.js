const path = require('path');
const Simulation = require('../models/simulation');


//Create Simulation
const createSimulation = async (simulationBody) =>{
     try {
   
    const simulation = await Simulation.create(simulationBody);
    console.log('Simulation crééééééé');
    return simulation; 
  } catch (error) {
    
    console.error('Erreur lors de la création de la simulation :', error);
    throw error; 
  }
}

//Get all Simulation
const getSimulations = async () =>{

    const simulations = await Simulation.find()    

    console.log(simulations);
    return simulations;
};

module.exports = {
  createSimulation,
  getSimulations,
};