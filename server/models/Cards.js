const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ["To-Do", "In Progress", "Under Review", "Finished"]
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "Urgent"]
    },
    deadline: {
      type: Date
    },
    order: {
        type: Number,
        required: true
      }
  }, {
    timestamps: true 
  });

const CardModel = mongoose.model("CardsCollection", CardSchema);

module.exports = CardModel;
