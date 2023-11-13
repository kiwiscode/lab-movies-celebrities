//  Add your code here
const { Schema, model } = require("mongoose");

const celebrityModel = new Schema(
  {
    name: {
      type: String,
    },
    occupation: {
      type: String,
    },
    catchPhrase: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Celebrity = model("Celebrities", celebrityModel);

module.exports = Celebrity;
