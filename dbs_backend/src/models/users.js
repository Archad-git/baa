const mongoose = require("mongoose");
const Role = require("../models/roles");
const Schema = mongoose.Schema;

const UserSchemaObject = {
  email: { type: String, require: true, null: false, unique: true },
  role: { type: String, default: "CLIENT" },
  image: { type: String , default: "/datas/avatar.jpeg" },
  phoneNumber: { type: String },
  password: { type: String },
  plainPassword: { type: String },
  fullName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  //courses: {type: [{type: String}]},
  creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  //reportsComments: {type: [{type: mongoose.SchemaTypes.ObjectId, ref: 'ReportComment'}] },
  gender: { type: Boolean, default: true },
  deletedAt: { type: Date, default: null },
};
const UserSchema = new Schema(UserSchemaObject, {
  timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);
//module.exports.fieldsRequired = UserSchemaObject;
