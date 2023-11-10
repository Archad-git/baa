const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchemaObject = {
  name: { type: String, require: true,  },
  date: { type: String  },
  description: { type: String },
  idColis: { type: [{type: String}] },
 createAt: { type: Date, default: Date.now() },
  deletedAt: { type: Date, default: null },
};
const EventSchema = new Schema(EventSchemaObject, {
  timestamps: true,
});

module.exports = mongoose.model("Event", EventSchema);