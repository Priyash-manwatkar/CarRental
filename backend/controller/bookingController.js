import Booking from "../model/Booking.js"
import Car from "../model/Car.js"



//function the availablity of the car
 const checkAvailibility =async (car,pickupDate,returnDate)=>{
  
        const booking= await Booking.find({car,
            pickupDate:{$lte:returnDate},
            returnDate:{$gte:pickupDate}
        })

        return booking.length==0
  
}


//api to check availbituly

export const checkAvailibilityofCar=async(req,res)=>{
    try {
        const {location,pickupDate,returnDate}=req.body;

        const cars=await Car.find({location,isAvailable:true})
   


        const availableCarPromise=cars.map(async(car)=>{
         const isAvailable= await checkAvailibility(car._id,pickupDate,returnDate)
         return {...car._doc,isAvailable:isAvailable}
        })

        let availableCar=await Promise.all(availableCarPromise);
        availableCar=availableCar.filter(car=>car.isAvailable===true)
        res.json({success:true,availableCar})

        
    } catch (error) {
           console.log(error.message);
    res.json({success:false,message:"error occured"}) 
    }
}




//book car

export const createBooking=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {car,pickupDate,returnDate}=req.body;
        const isAvailable=await checkAvailibility(car,pickupDate,returnDate)
        if(!isAvailable)
        {
            res.json({success:false,message:"not avaiable"})
        }

        const carData=await Car.findById(car)

        //calculate price 

        const picked=new Date(pickupDate);
        const returned=new Date(returnDate);
        const nofDays=Math.ceil((returned-picked)/(1000*60*60*24));
        const price=carData.pricePerDay*nofDays;


        await Booking.create({car,owner:carData.owner,user:_id,pickupDate,returnDate,price})
      res.json({success:true,message:"Booking created"})
        
    } catch (error) {
               console.log(error.message);
    res.json({success:false,message:"error occured"}) 
    }
}

//list of booking for user 
export const getUserBookings=async(req,res)=>{
    try {
        const {_id}=req.user;
        const bookings=await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
              res.json({success:true,bookings})
    } catch (error) {
              console.log(error.message);
    res.json({success:false,message:"error occured"})
    }
}

//booking owner
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "error occurred" });
  }
};


//to change booking status 

// export const changeBookingStatus =async(req,res)=>{
//     try {
//         const {_id}=req.user;
//         const {bookingId,status}=req.body;
//         const booking=await Booking.findById(bookingId)

//         if(booking.owner.toString()!=_id.toString())
//         {
//             return res.json({success:false,message:"UnAuthorized"})

//         }

//         booking.status=status;
//         await booking.save();
//         res.json({success:true,message:"status updated"})
     
//     } catch (error) {
//               console.log(error.message);
//     res.json({success:false,message:"error occured"})
//     }
// }

export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Check if owner exists and matches logged-in user
    if (!booking.owner || booking.owner.toString() !== _id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Status updated successfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

