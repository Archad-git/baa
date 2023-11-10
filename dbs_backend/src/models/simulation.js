const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SimulationSchemaObject = {
  nom: { type: String, default: null },
  nombre: { type: String, require: true,  },
  createAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: null },
};
const SimulationSchema = new Schema(SimulationSchemaObject, {
  timestamps: true,
});

module.exports = mongoose.model("Simulation", SimulationSchema);