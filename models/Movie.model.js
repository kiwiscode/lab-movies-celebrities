//  Add your code here
const { Schema, model } = require("mongoose");

const movieModel = new Schema(
  {
    title: {
      type: String,
    },
    genre: {
      type: String,
    },
    plot: {
      type: String,
    },
    cast: [
      {
        type: Schema.Types.ObjectId,
        ref: "Celebrity",
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Movie = model("Movies", movieModel);

module.exports = Movie;
