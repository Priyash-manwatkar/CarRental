import express from "express";
import { changeBookingStatus, checkAvailibilityofCar, createBooking, getOwnerBookings, getUserBookings } from "../controller/bookingController.js";
import { protect } from "../middleware/auth.js";
const bookingRouter=express.Router();
bookingRouter.post('/check-availability',checkAvailibilityofCar)
bookingRouter.post('/create',protect,createBooking)
bookingRouter.get('/user',protect,getUserBookings)
bookingRouter.get('/owner',protect,getOwnerBookings)
bookingRouter.post("/change-status",protect,changeBookingStatus)

export default bookingRouter;
