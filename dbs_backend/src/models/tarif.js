const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TarifSchemaObject = {
  type: { type: String, require: true,  },
  expedition: { type: String  },
  destination: { type: String },
  prix: { type: String },
  continent: { type: String },
 createAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: null },
};
const TarifSchema = new Schema(TarifSchemaObject, {
  timestamps: true,
});

module.exports = mongoose.model("Tarif", TarifSchema);