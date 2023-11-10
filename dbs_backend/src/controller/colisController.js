const colisService = require('../services/colisService');
//const api_consumer = require('../services/api_consumer');
const emailService = require('../services/emailServices')
const User = require("../../src/models/colis");
const cryptoJS = require("crypto-js");
const zlib = require('zlib');

//Create User in Data Base
const createColis = async (req, res) =>{
    console.log("CREATE CONTROLLER");
    const body =JSON.parse(req.headers.body);
    //console.log(body);
    body.image = req.file? "/datas/"+req.file.filename: "";
    
    try{
        
        console.log("#####################THE COLIS:");
      
        console.log(body);
       
        const colisCreated = await colisService.createColis(body);
        const result = await emailService.sendToAdminColis();
        res.status(200).json({"message" : "Colis created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating User!!!"});
    };

}

//Update User in Data Base
const updateColis = async (req, res) =>{
    const body = JSON.parse(req.headers.body);
    console.log('UPDATE COLIS');
    console.log(body);
    if(req.file){
        body.image = "/datas/"+req.file.filename;
    }
    try{
        const colis = await colisService.updateColisById(req.params.colisId, body);
        res.status(200).json({"message" : "User updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating user!!!"});
    }
}
//Update COLIS valid in Data Base
const updateValidColis = async (req, res) =>{
    const body =req.body;
    console.log('UPDATE COLIS Valid');
    console.log(body);
    
    try{
        const colis = await colisService.updateColisById(req.params.colisId, body);
        res.status(200).json({"message" : "User updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating user!!!"});
    }
}



//Move Class To User in Data Base


//Get a User in Data Base
const getColis = async (req, res) =>{
    
    try{
        const user = await colisService.getColisById(req.params.colisId);
        res.status(200).json(user);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "User not exist in DB!!!"});
    }
}

//Get All Users in Data Base
const getColiss = async (req, res) =>{
    
    try{
        const coliss = await colisService.getColiss();
	 
        res.send(coliss);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Users not exist in DB!!!"});
    }
}
exports.all = (req, res) =>{
    Colis.find({},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};


//Delete a Users in Data Base
const deleteColis = async (req, res) =>{
    
    try{
        const user = await colisService.deleteColisById(req.params.colisId);
        res.status(200).json({"message": "User deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}



//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
  createColis,
  updateColis,
  getColis,
  getColiss,
  updateValidColis,
  deleteColis,
};
