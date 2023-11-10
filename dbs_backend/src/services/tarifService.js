const path = require('path');
const Tarif = require('../models/tarif');


//Create tarif
const createTarif = async (tarifBody) =>{
     try {
    // Créez un nouvel utilisateur en utilisant le modèle User et les données de userBody
    const tarif = await Tarif.create(tarifBody);
    console.log('tarifssss crééééééé');

    // Le nouvel utilisateur est maintenant enregistré dans la base de données

    return tarif; // Retournez l'utilisateur créé
  } catch (error) {
    // Gérez les erreurs de création d'utilisateur, par exemple, des erreurs de validation du schéma
    console.error('Erreur lors de la création de le\'tarif :', error);
    throw error; // Vous pouvez choisir de propager l'erreur ou de la gérer différemment
  }
}

//Get all users
const getTarifs = async () =>{

    const tarifs = await Tarif.find()
        //.populate({ path: "children" })
        // .populate({ path: "behaviors" })
        // .populate({ path: "reports" });

    console.log(tarifs);
    return tarifs;
    // .then((err, data) =>{
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) =>{
    //     return err;
    // });
};

//Edit User by Id
const updateTarifById = async (tarifId, tarifBody) =>{

    const tarif = await Tarif.findByIdAndUpdate(
        tarifId,
        {$set: tarifBody},
        {new: true}
    );
    return tarif;
}


//Get User by Id
const getTarifById = async (tarifId) =>{

    const tarif = await Tarif.findById(tarifId)
      .populate({ path: "children" })
      .populate({ path: "parentOfStudent" })
    //   .populate({ path: "behaviors" })
    //   .populate({ path: "reports" });
            console.log(tarif)
    return tarif;
}

//Delete User by Id
const deleteTarifById = async (tarifId) =>{

    const tarif = await Tarif.findById(tarifId)
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
  createTarif,
  getTarifs,
  updateTarifById,
  getTarifById,
  deleteTarifById,
 
};
