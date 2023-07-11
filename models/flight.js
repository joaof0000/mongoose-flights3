const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//adding destination schema
//one flight can have multiple destinations (if indirect)
//a destination belongs to a flight
const destinationsSchema = new Schema({
  airport: {
    type: String,
    enum: ["YYZ", "LIS", "JFK", "LAX", "GTW"],
  },
  arrival: {
    type: Date,
  },
});

const flightSchema = new Schema(
  {
    airline: { type: String, enum: ["Air Canada", "SATA", "Quantas"] },
    airport: {
      type: String,
      enum: ["YYZ", "LIS", "JFK", "LAX", "GTW"],
      default: "YYZ",
    },
    flightNo: { type: Number, min: 10, max: 9999 },
    destinations: [destinationsSchema],
    departs: {
      type: Date,
      default: function () {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);
