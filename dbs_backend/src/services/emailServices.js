let nodemailer = require('nodemailer');
const User = require('../models/users');
const cryptoJS = require('crypto-js');
const dotenv = require("dotenv").config();

const sendCredentialToUser = async (receiverId, password) =>{
    const receiver = await User.findById(receiverId);
    console.log('Envoie email');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'diandayassine1998@gmail.com',
            pass: 'zanbaxaqeohanoaz'
        }
    });
    const subject = 'Enregistrement sur DBS-GROUP';
    let mailOptions = {
        from: 'diandayassine1998@gmail.com',
        to: receiver.email,
        subject: subject,
        //text: emailBody
        html: `<p></br>

        Bienvenue parmis nous. Nous avons tous très hâte que vous profitez de nos services 🙂
        Comme prévu, nous te retrouvons sur le site de DBS-Groupe (https://dbsgroup.com). 
        Pour te connecter, utilise les codes suivants :<p>
        <p>Identifiant :<strong>${receiver.email}</strong></p><p>Mot de passe :<strong>${password}</strong></p>
        <p>Tu pourras alors accéder à l'intégralité de notre application.
        Nous sommes à ton entière disposition pour répondre à tes questions, éventuellement sur l'accès et/ou l'utilisation de la plateforme par ce mail alors n'hésite pas 🙂.
        Toute l'équipe te souhaite une excellente journée !</p></br>
        
        <p>À très vite 😀 </p>`
        
        // `<h3>Bonjour ${receiver.firstName}, Bienvenue dans la meilleur plateforme de formation en ligne Mon Centre de Formation.</h3><h4> Vos identifiants pour vous connecter sont les suivants: </h4></br><p>--------------------------------------------------------------------------------------------------</p>
        // <p>Email: ${receiver.email}, Mot de Pass: ${password}. </br>Nous vous souhaitons une très bonne formation.</p>`
    };
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent: "+info.response);
            return info;
        }
    });
    
}
const sendToAdmin = async (receiverId) =>{
    const receiver = await User.findById(receiverId);
    console.log("Envoie email a l'admin");
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'diandayassine1998@gmail.com',
            pass: 'zanbaxaqeohanoaz'
        }
    });
    const subject = 'Nouveau client sur la plateforme DBS-GROUP';
    let mailOptions = {
        from: 'diandayassine1998@gmail.com',
        to: receiver.email,
        subject: subject,
        //text: emailBody
        html: `<p></br>

        Bonjour chers administrateur. La plateforme vient d'accueillir un nouveau client 🙂
        Ce client se nomme :<p>
        <p>Nom :<strong>${receiver.lastName}</strong></p><p>Prénom :<strong>${receiver.firstName}</strong></p>
        <p>Merci et excellente journée !</p></br>`
        
        // `<h3>Bonjour ${receiver.firstName}, Bienvenue dans la meilleur plateforme de formation en ligne Mon Centre de Formation.</h3><h4> Vos identifiants pour vous connecter sont les suivants: </h4></br><p>--------------------------------------------------------------------------------------------------</p>
        // <p>Email: ${receiver.email}, Mot de Pass: ${password}. </br>Nous vous souhaitons une très bonne formation.</p>`
    };
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent: "+info.response);
            return info;
        }
    });
    
}
const sendToAdminColis = async () =>{
    //const receiver = await User.findById(receiverId);
    console.log("Envoie email a l'admin pour un nouveau colis");
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'diandayassine1998@gmail.com',
            pass: 'zanbaxaqeohanoaz'
        }
    });
    const subject = 'Nouvelle commande sur la plateforme DBS-GROUP';
    let mailOptions = {
        from: 'diandayassine1998@gmail.com',
        to:'wabmicrosoft@gmail.com',
        subject: subject,
        //text: emailBody
        html: `<p></br>

        Bonjour chers administrateur. La plateforme vient d'accueillir une nouvelle commande 🙂
        <p>
        <p>Connectez vous pour plus de détails</p>
        <p>Merci et excellente journée !</p></br>`
        
        // `<h3>Bonjour ${receiver.firstName}, Bienvenue dans la meilleur plateforme de formation en ligne Mon Centre de Formation.</h3><h4> Vos identifiants pour vous connecter sont les suivants: </h4></br><p>--------------------------------------------------------------------------------------------------</p>
        // <p>Email: ${receiver.email}, Mot de Pass: ${password}. </br>Nous vous souhaitons une très bonne formation.</p>`
    };
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Email sent: "+info.response);
            return info;
        }
    });
    
}
const recorverPassword = async (receiver) =>{
    //const receiver = await User.findOne({email: email});
    // if(!receiver){
    //     throw new ApiError(httpStatus.NOT_FOUND, 'Email not found');
    // }
    

        
        const password =  receiver.password;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'diandayassine1998@gmail.com',
                pass: 'zanbaxaqeohanoaz'
            }
        });
        const subject = 'Récupération de mot de passe sur dbs-group';
        let mailOptions = {
            from: process.env.ADMIN_MAIL,
            to: receiver.email,
            subject: subject,
            //text: emailBody
            html: `<p>Hello, j'espère que tu vas bien !</br>
    
            Nous avons tous très hâte que tu continues ta navigation 🙂
            Nous te retrouvons sur le site de DBS-group (https://dbsgroup.com). 
            Pour te connecter, utilise les codes suivants :<p>
            <p>Identifiant :<strong>${receiver.email}</strong></p><p>Mot de passe :<strong>${password}</strong></p>
           </br>
            
            <p>À très vite 😀 </p>`
            
            // `<h3>Bonjour ${receiver.firstName}, Bienvenue dans la meilleur plateforme de formation en ligne Mon Centre de Formation.</h3><h4> Vos identifiants pour vous connecter sont les suivants: </h4></br><p>--------------------------------------------------------------------------------------------------</p>
            // <p>Email: ${receiver.email}, Mot de Pass: ${password}. </br>Nous vous souhaitons une très bonne formation.</p>`
        };
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error);
            }
            else{
                console.log("Email sent: "+info.response);
                return info;
            }
        });
    
    
    
}

module.exports ={
    sendCredentialToUser,
    recorverPassword,
    sendToAdmin,
    sendToAdminColis
}

