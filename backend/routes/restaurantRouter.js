import express from 'express';
import { addRestaurant, removeRestaurant } from '../controllers/restaurantController.js';
import multer from 'multer';
import { listRestaurants } from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage });

// restaurantRouter.get("/list", listRestaurant);
restaurantRouter.post("/add", upload.single("image"), addRestaurant);
restaurantRouter.post("/remove", removeRestaurant);
restaurantRouter.get('/list', listRestaurants);

export default restaurantRouter;
