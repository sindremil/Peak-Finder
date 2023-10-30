import { model, Schema } from "mongoose";

const destinationSchema = new Schema({
  Resort: String,
  Country: String,
  HighestPoint: Number,
  LowestPoint: Number,
  DayPricePassAdult: Number,
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
  LiftCapacity: Number,
  Snowcanons: Number,
  AverageRating: Number,
  TotalRatings: Number,
  Certified: Boolean,
});

export default model("Destination", destinationSchema);