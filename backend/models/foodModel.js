// import mongoose from "mongoose";

// const foodSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true},
//     image: { type: String, required: true },
//     category:{ type:String, required:true}
// })

// const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
// export default foodModel;

import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' } // Link to Restaurant
});

const foodModel = mongoose.model('Food', foodSchema);
export default foodModel;
