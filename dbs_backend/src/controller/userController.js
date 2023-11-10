const userService = require('../services/userService');
//const api_consumer = require('../services/api_consumer');
const emailService = require('../services/emailServices')
const User = require("../../src/models/users");
const cryptoJS = require("crypto-js");
const zlib = require('zlib');

//Create User in Data Base
const createUser = async (req, res) =>{
    console.log("CREATE CONTROLLER");
    const body =req.body; //JSON.parse(req.headers.body);
    //console.log(body);
    body.image = req.file? "/datas/"+req.file.filename: "";
    try{
        const user = await User.findById(body.creator); //api_consumer.getUserById(body.user_id, req.token);
        body.creator = user;
        //const password = cryptoJS.AES.encrypt(body.password, process.env.PASS_SEC).toString()
        console.log("#####################THE USER:");
        //body.password = password;
        console.log(body);
        // const creator = {
        //     _id : user.data._id,
        //     role: user.data.role,
        //     email: user.data.email,
        //     firstName: user.data.firstName,
        //     lastName: user.data.lastName
        // };
        // const restaurant = {
        //     _id : user.data.restaurant?._id,
        //     name_restaurant : user.data.restaurant?.name_restaurant,
        //     image_restaurant: user.data.restaurant?.image_restaurant
        // }
        // newUser._creator = creator;
        // newUser.restaurant = restaurant;
        // console.log(newUser);
        const userCreated = await userService.createUser(body);
        const result = await emailService.sendCredentialToUser(userCreated?._id,userCreated?.password);
        const resultt = await emailService.sendToAdmin(userCreated?._id);
        res.status(200).json({user: userCreated });

    }
    catch(error){
        res.status(500).json({"message" : "Error encounterd creating User!!!"});
    };

}

//Update User in Data Base
const updateUser = async (req, res) =>{
    const body = req.body;
    console.log(body);
    /*if(req.file){
        body.image = "/datas/"+req.file.filename;
    }*/
    try{
        const user = await userService.updateUserById(req.params.userId, body);
        res.status(200).json({user: user});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Error encounterd creating user!!!"});
    }
}



//Move Class To User in Data Base


//Get a User in Data Base
const getUser = async (req, res) =>{
    
    try{
        const user = await userService.getUserById(req.params.userId);
        res.status(200).json(user);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "User not exist in DB!!!"});
    }
}

//Get All Users in Data Base
const getUsers = async (req, res) =>{
    
    try{
        const users = await userService.getUsers();
	 //const jsonString = JSON.stringify(users);
	// Compression GZIP
  /*zlib.gzip(jsonString, (err, buffer) => {
    if (err) {
      res.status(500).send('Erreur de compression');
    } else {
      // Envoyer les données compressées en réponse
      res.header('Content-Encoding', 'gzip');
      res.send(buffer);
    }
  });*/
        //res.status(200).json(users);
        res.send(users);
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "Users not exist in DB!!!"});
    }
}
exports.all = (req, res) =>{
    User.find({},(err, obj)  => {
        console.log(obj);
        res.json(obj);
    });
    
};


//Delete a Users in Data Base
const deleteUser = async (req, res) =>{
    
    try{
        const user = await userService.deleteUserById(req.params.userId);
        res.status(200).json({"message": "User deleted successfuly!!!"});
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message" : "An Error encountered!!!"});
    }
}

//recover password
const recoverPassword = async(req, res) => {
    
    try {
        const body = req.body
        const receiver = await User.findOne({ email: body.email })
        if (!receiver) {
            return res.status(401).json({"message" : "Account not exist!!!"})
        }
        const result = await emailService.recorverPassword(receiver);
        res.status(200).json({"message": "email sent"});
    }
    catch(err){
        res.status(500).json(err);
    }
};

//EXPORTS ALL CONTROLLER'S SERVICES
module.exports = {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  recoverPassword
};
