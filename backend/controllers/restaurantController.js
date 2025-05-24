import RestaurantModel from "../models/restaurantModel.js";

export const addRestaurant = async (req, res) => {
  try {
    const { name, location } = req.body;
    const image = req.file.filename;

    if (!name || !location || !image) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const newRestaurant = new RestaurantModel({ name, location, image });
    await newRestaurant.save();

    res.json({ success: true, message: "Restaurant added successfully" });
  } catch (error) {
    res.json({ success: false, message: "Server error", error });
  }
};

// export const listRestaurant = async (req, res) => {
//   try {
//     const restaurants = await RestaurantModel.find({});
//     res.json({ success: true, data: restaurants });
//   } catch (error) {
//     res.json({ success: false, message: "Failed to fetch restaurants" });
//   }
// };

export const removeRestaurant = async (req, res) => {
  try {
    const { id } = req.body;
    await RestaurantModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Restaurant removed successfully" });
  } catch (error) {
    res.json({ success: false, message: "Failed to remove restaurant" });
  }
};

export const listRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});
    res.json({ success: true, restaurants });
  } catch (error) {
    console.error(error); // <-- log the error to console
    res.status(500).json({ success: false, message: "Failed to fetch restaurants" });
  }
};
