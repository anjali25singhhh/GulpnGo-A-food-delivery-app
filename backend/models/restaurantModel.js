import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
});

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);
export default RestaurantModel;
    