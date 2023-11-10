const tarifService = require('../services/tarifService');
//const api_consumer = require('../services/api_consumer');
const emailService = require('../services/emailServices')
const Tarif = require("../../src/models/tarif");
const cryptoJS = require("crypto-js");
const zlib = require('zlib');

//Create tarif in Data Base
const createTarif = async (req, res) =>{
    console.log("CREATE CONTROLLER");
    const body =req.body; //JSON.parse(req.headers.body);
    //console.log(body);
    
    try{
        
        console.log("#####################THE TARIF:");
      
        //console.log(body);
       
        const tarifCreated = await tarifService.createTarif(body);
        res.status(200).json({"message" : "tarif created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating tarif!!!"});
    };

}

//Update User in Data Base
const updateTarif = async (req, res) =>{
    const body = req.body;//JSON.parse(req.headers.body);
    console.log(body);
    /*if(req.file){
        body.image = "/datas/"+req.file.filename;
    }*/
    try{
        const tarif = await tarifService.updateTarifById(req.params.tarifId, body);
        res.status(200).json({"message" : "tarif updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating tarif!!!"});
    }
}



//Move Class To User in Data Base


//Get a User in Data Base
const getTarif = async (req, res) =>{
    
    try{
        const tarif = await tarifService.getTarifById(req.params.tarifId);
        res.status(200).json(tarif);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "tarif not exist in DB!!!"});
    }
}

//Get All Users in Data Base
const getTarifs = async (req, res) =>{
    
    try{
        const tarifs = await tarifService.getTarifs();
	 
        res.send(tarifs);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "tarif not exist in DB!!!"});
    }
}
exports.all = (req, res) =>{
    Colis.find({},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};


//Delete a Users in Data Base
const deleteTarif = async (req, res) =>{
    
    try{
        const tarif = await tarifService.deleteTarifById(req.params.tarifId);
        res.status(200).json({"message": "tarif deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}



//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
  createTarif,
  updateTarif,
  getTarif,
  getTarifs,
  deleteTarif,
};
