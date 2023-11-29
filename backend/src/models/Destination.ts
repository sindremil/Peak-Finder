import { model, Schema } from "mongoose";

const destinationSchema = new Schema({
  id: Number,
  Resort: String,
  Country: String,
  HighestPoint: Number,
  LowestPoint: Number,
  ElevationDifference: Number,
  DayPassPriceAdult: Number,
  BeginnerSlope: Number,
  IntermediateSlope: Number,
  DifficultSlope: Number,
  TotalSlope: Number,
  Snowparks: Boolean,
  NightSki: Boolean,
  SurfaceLifts: Number,
  ChairLifts: Number,
  GondolaLifts: Number,
  TotalLifts: Number,
  TotalRating: Number,
  AmountOfRatings: Number,
  Certified: Boolean,
});

export default model("Destination", destinationSchema);
