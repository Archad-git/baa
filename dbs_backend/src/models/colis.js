const mongoose = require("mongoose");
const Role = require("../models/roles");
const Schema = mongoose.Schema;

const ColisSchemaObject = {
  reference: { type: String, require: true, null: false, unique: true },
  image: { type: String , default: "/datas/avatar.jpeg" },
  nomExpediteur: { type: String  },
 prenomExpediteur: { type: String },
  adresseExpediteur: { type: String },
  numeroExpediteur: { type: String },
  nomDestinataire: { type: String  },
  prenomDestinataire: { type: String },
  adresseDestinataire: { type: String },
  numeroDestinataire: { type: String },
  dateEnvoie: { type: String },
  nombre: { type: String },
  poids: { type: String },
  type: { type: String },
  longueur: { type: String },
  largeur: { type: String },
  hauteur: { type: String },
  ramassage: { type: Boolean },
  livraison: { type: Boolean },
  idClient: { type: String },
  explication: { type: String },
  estimation: { type: String },
  prix: { type: String },
  valid: { type: Boolean,default: false },
  events: { type: [{type: String}] },
  deletedAt: { type: Date, default: null },
  extension: { type: String },
};
const ColisSchema = new Schema(ColisSchemaObject, {
  timestamps: true,
});

module.exports = mongoose.model("Colis", ColisSchema);