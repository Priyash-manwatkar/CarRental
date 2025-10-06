import imagekit from "../config/imagekit.js";
import Booking from "../model/Booking.js";
import Car from "../model/Car.js";
import User from "../model/User.js";
import fs from 'fs';


// export const changeRoleToOwner=async(req,res)=>{
//     try {
//         const {_id}=req.user;
//         await User.findByIdAndUpdate(_id,{role:"owner"})
//       return   res.json({success:true,message:"now you can list your car"})
//     } catch (error) {
//         console.log(error.message);
//         return es.json({success:true,message:"error occured"})
//     }
// }
export const changeRoleToOwner = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { role: "owner" });

    return res.json({ success: true, message: "Now you can list your car" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Error occurred" });
  }
};


//add car

//  export const addCar=async(req,res)=>{
//     try {
//         const {_id}=req.body;
//         let car=JSON.parse(req.body.carData);
//         const imageFile=req.file;
//         //upload image to imagekit
//         const fileBuffer=fs.readFileSync(imageFile.path)
//      const response=await imagekit.upload({
//             file:fileBuffer,
//             fileName:imageFile.orignalName,
//             folder:'/cars'
//         })

//       // optimaization through imagekit url tranformation 
      
//     var optimazedImageUrl=imagekit.url({
//         path:response.filePath,
//         transformation:[
//             {width:'1280'},//width resizing
//             {quality:auto},//auto compression
//             {format:'webp'}//convert to mordern format
//         ]
//     })

//     const image=optimazedImageUrl;
//     await Car.create({...car,owner:_id,image})

//     res.json({success:true,message:"car added"})

        

        
//     } catch (error) {
//            console.log(error.message);
//         return res.json({success:true,message:"error occured"})
//     }
        


// }
// backend/controller/ownerController.js


// export const addCar = async (req, res) => {
//   try {
//     const { brand, model, pricePerDay, category, seating_capacity, fuel_type, transmission, location, description, year } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'Car image is required' });
//     }

//     const newCar = new Car({
//       owner: req.user._id,
//       brand,
//       model,
//       pricePerDay,
//       category,
//       seating_capacity,
//       fuel_type,
//       transmission,
//       location,
//       description,
//       year,
//       image: req.file.path,
//       isAvailable: true
//     });

//     await newCar.save();
//     res.status(201).json({ success: true, message: 'Car added successfully!', car: newCar });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



export const addCar = async (req, res) => {
  try {
    const { brand, model, pricePerDay, category, seating_capacity, fuel_type, transmission, location, description, year } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Car image is required' });
    }

    // Read local file
    const fileBuffer = fs.readFileSync(req.file.path);

    // Upload to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: req.file.originalname,
      folder: "/cars",
    });

    // Use ImageKit URL
    const imageUrl = response.url;

    const newCar = new Car({
      owner: req.user._id,
      brand,
      model,
      pricePerDay,
      category,
      seating_capacity,
      fuel_type,
      transmission,
      location,
      description,
      year,
      image: imageUrl, // ✅ Save ImageKit URL
      isAvailable: true
    });

    await newCar.save();

    res.status(201).json({ success: true, message: "Car added successfully!", car: newCar });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getOwnersCar = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id });
    res.json({ success: true, cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//API to toogle car Availibility

 export const toogleAvailablity=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {carId}=req.body;
        const car=await Car.findById(carId);

        if(car.owner.toString()!==_id.toString())
        {
            res.json({success:false,message:"unAuthorized"})
        }

        car.isAvailable=!car.isAvailable;
        await car.save()
        res.json({success:"true",message:"Availability Tooggled"})
 } catch (error) {
    console.log(error.message);
    res.json({success:false,message:"error occured"})        
    }
 }

 //Api to Delete a Car
  export const deleteCar=async(req,res)=>{
    try {
        const {_id}=req.user;
        const {carId}=req.body;
        const car=await Car.findById(carId);

        if(car.owner.toString()!==_id.toString())
        {
            res.json({success:false,message:"unAuthorized"})
        }

      car.owner=null;
      car.isAvailable=false;
      await car.save()
        res.json({success:"true",message:"car removed"})
 } catch (error) {
    console.log(error.message);
    res.json({success:false,message:"error occured"})        
    }
 }

 // API to get dashboard data
 export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user; // <- use req.user, not req.body

    if (role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const cars = await Car.find({ owner: _id });

const bookings = (await Booking.find({ owner: _id }).populate("car"))
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const pendingBookings = await Booking.find({ owner: _id, status: "pending" });
    const completedBookings = await Booking.find({ owner: _id, status: "confirmed" });

    const monthlyRevenue = bookings
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashBoardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({ success: true, dashBoardData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error occurred" });
  }
};


 // api to update user image

 export const updateuserImage=async(req,res)=>{
    try {
        const {_id}=req.user;
        const imageFile = req.file;

    // Read file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // Optimize through imagekit transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

   const image=optimizedImageUrl;
   await User.findByIdAndUpdate(_id,{image})

    return res.json({ success: true, message: "Image Updated" });

        
    } catch (error) {
            console.log(error.message);
    res.json({success:false,message:"error occured"})  
    }
 }
