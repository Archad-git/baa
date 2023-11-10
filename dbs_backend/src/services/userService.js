const path = require('path');
const User = require('../models/users');


//Create User
const createUser = async (userBody) =>{
     try {
    // Créez un nouvel utilisateur en utilisant le modèle User et les données de userBody
    const user = await User.create(userBody);
    console.log('utilisateur crééééééé');

    // Le nouvel utilisateur est maintenant enregistré dans la base de données

    return user; // Retournez l'utilisateur créé
  } catch (error) {
    // Gérez les erreurs de création d'utilisateur, par exemple, des erreurs de validation du schéma
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    throw error; // Vous pouvez choisir de propager l'erreur ou de la gérer différemment
  }
}

//Get all users
const getUsers = async () =>{
  console.log('users');
    const users = await User.find()
        //.populate({ path: "children" })
        // .populate({ path: "behaviors" })
        // .populate({ path: "reports" });

    //console.log(users);
    return users;
    // .then((err, data) =>{
    //     console.log(data);
    //     return data;
    // })
    // .catch((err) =>{
    //     return err;
    // });
};

//Edit User by Id
const updateUserById = async (userId, userBody) =>{

    const user = await User.findByIdAndUpdate(
        userId,
        {$set: userBody},
        {new: true}
    );
    return user;
}


//Get User by Id
const getUserById = async (userId) =>{

    const user = await User.findById(userId)
      .populate({ path: "children" })
      .populate({ path: "parentOfStudent" })
    //   .populate({ path: "behaviors" })
    //   .populate({ path: "reports" });
            console.log(user)
    return user;
}

//Delete User by Id
const deleteUserById = async (userId) =>{

    const user = await User.findById(userId)
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
  createUser,
  getUsers,
  updateUserById,
  getUserById,
  deleteUserById,
 
};
