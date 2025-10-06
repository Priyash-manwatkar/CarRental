import express from 'express';
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnersCar, toogleAvailablity, updateuserImage } from '../controller/ownerController.js';
import { protect } from "../middleware/auth.js";
// import upload  from '../middleware/multer.js';
    import {upload} from '../middleware/multer.js';

const ownerRouter=express.Router();

ownerRouter.post('/change-role',protect,changeRoleToOwner)
// ownerRouter.post('/add-car', protect, upload.single("image"), addCar);
ownerRouter.post('/add-car', protect, upload.single('image'), addCar);
// ownerRouter.get("/cars",protect,getOwnersCar)
ownerRouter.get('/cars', protect, getOwnersCar);
ownerRouter.post('/toogle-car',protect,toogleAvailablity);
ownerRouter.post('/delete-car',protect,deleteCar)

ownerRouter.get('/dashboard',protect,getDashboardData)

ownerRouter.post('/update-image', protect, upload.single("image"),updateuserImage)


export default ownerRouter;