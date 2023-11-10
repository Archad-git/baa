const path = require('path');
const Event = require('../models/event');


//Create Event
const createEvent = async (eventBody) =>{
     try {
    // Créez un nouvel utilisateur en utilisant le modèle User et les données de userBody
    const event = await Event.create(eventBody);
    console.log('Eventsss crééééééé');

    // Le nouvel utilisateur est maintenant enregistré dans la base de données

    return event; // Retournez l'utilisateur créé
  } catch (error) {
    // Gérez les erreurs de création d'utilisateur, par exemple, des erreurs de validation du schéma
    console.error('Erreur lors de la création de l\'event :', error);
    throw error; // Vous pouvez choisir de propager l'erreur ou de la gérer différemment
  }
}

//Get all events
const getEvents = async () =>{

    const events = await Event.find()
        //.populate({ path: "children" })
        // .populate({ path: "behaviors" })
        // .populate({ path: "reports" });

    console.log(events);
    return events;
    // .then((err, data) =>{
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) =>{
    //     return err;
    // });
};

//Edit event by Id
const updateEventById = async (eventId, eventBody) =>{

    const event = await Event.findByIdAndUpdate(
        eventId,
        {$set: eventBody},
        {new: true}
    );
    return event;
}


//Get event by Id
const getEventById = async (eventId) =>{

    const event = await Event.findById(eventId)
      .populate({ path: "children" })
      .populate({ path: "parentOfStudent" })
    //   .populate({ path: "behaviors" })
    //   .populate({ path: "reports" });
            console.log(event)
    return event;
}

//Delete User by Id
const deleteEventById = async (eventId) =>{

    const event = await Event.findById(eventId)
            .then(data =>{
                data.deletedAt = Date.now();
                data.save()
                return data
            })
            .catch(err =>{
                return err
            })
}





module.exports = {
  createEvent,
  getEvents,
  updateEventById,
  getEventById,
  deleteEventById,
 
};
