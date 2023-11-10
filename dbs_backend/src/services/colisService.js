const path = require('path');
const Colis = require('../models/colis');


//Create User
const createColis = async (colisBody) =>{
     try {
    // Créez un nouvel utilisateur en utilisant le modèle User et les données de userBody
    const colis = await Colis.create(colisBody);
    console.log('Colisss crééééééé');

    // Le nouvel utilisateur est maintenant enregistré dans la base de données

    return colis; // Retournez l'utilisateur créé
  } catch (error) {
    // Gérez les erreurs de création d'utilisateur, par exemple, des erreurs de validation du schéma
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    throw error; // Vous pouvez choisir de propager l'erreur ou de la gérer différemment
  }
}

//Get all users
const getColiss = async () =>{

    const coliss = await Colis.find()
        //.populate({ path: "children" })
        // .populate({ path: "behaviors" })
        // .populate({ path: "reports" });

    //console.log(coliss);
    return coliss;
    // .then((err, data) =>{
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) =>{
    //     return err;
    // });
};

//Edit User by Id
const updateColisById = async (colisId, colisBody) =>{

    const colis = await Colis.findByIdAndUpdate(
        colisId,
        {$set: colisBody},
        {new: true}
    );
    return colis;
}


//Get User by Id
const getColisById = async (colisId) =>{

    const colis = await Colis.findById(colisId)
      .populate({ path: "children" })
      .populate({ path: "parentOfStudent" })
    //   .populate({ path: "behaviors" })
    //   .populate({ path: "reports" });
            console.log(colis)
    return colis;
}

//Delete User by Id
const deleteColisById = async (colisId) =>{

    const colis = await Colis.findById(colisId)
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
  createColis,
  getColiss,
  updateColisById,
  getColisById,
  deleteColisById,
 
};
