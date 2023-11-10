const eventService = require('../services/eventService');
//const api_consumer = require('../services/api_consumer');
const emailService = require('../services/emailServices')
const Event = require("../../src/models/event");
const cryptoJS = require("crypto-js");
const zlib = require('zlib');

//Create Event in Data Base
const createEvent = async (req, res) =>{
    console.log("CREATE CONTROLLER");
    const body =req.body;//JSON.parse(req.headers.body);
    //console.log(body);
    
    try{
        
        console.log("#####################THE EVENT:");
      
        console.log(body);
        body.idColis=JSON.parse(body.idColis);
       
        const eventCreated = await eventService.createEvent(body);
        res.status(200).json({"message" : "Event created successfuly!!!"});

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating User!!!"});
    };

}


//Update User in Data Base
const updateEvent = async (req, res) =>{
    const body = req.body;//JSON.parse(req.headers.body);
    console.log(body);
    /*if(req.file){
        body.image = "/datas/"+req.file.filename;
    }*/
    try{
        const event = await eventService.updateEventById(req.params.eventId, body);
        res.status(200).json({"message" : "Event updatedted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating user!!!"});
    }
}



//Move Class To User in Data Base


//Get a User in Data Base
const getEvent = async (req, res) =>{
    
    try{
        const event = await eventService.getEventById(req.params.eventId);
        res.status(200).json(event);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Event not exist in DB!!!"});
    }
}

//Get All Users in Data Base
const getEvents = async (req, res) =>{
    
    try{
        const events = await eventService.getEvents();
	 
        res.send(events);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Events not exist in DB!!!"});
    }
}
exports.all = (req, res) =>{
    Colis.find({},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};


//Delete a Users in Data Base
const deleteEvent = async (req, res) =>{
    
    try{
        const event = await eventService.deleteEventById(req.params.eventId);
        res.status(200).json({"message": "Event deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}



//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
  createEvent,
  updateEvent,
  getEvent,
  getEvents,
  deleteEvent,
};
