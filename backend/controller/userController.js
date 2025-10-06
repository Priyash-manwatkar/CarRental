import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Car from "../model/Car.js";

// generate token .
// const generateToken=(userId)=>{
//     const payload=userId;
//     return jwt.sign(payload,process.env.JWT_SECRET)
//  }

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//Register User
export const registerUser =async(req,res)=>{
    try {
        const {name,email,password}=req.body;

        if(!name || !email || !password || password.length <8)
        {
            return res.json({success:false,message:"Fill all the fileds"})
        }
        const userExits=await User.findOne({email});
        if(userExits)
        {
            return res.json({success:false,message:"User already exits"})
        }
 const hashedPassword=await bcrypt.hash(password,10);

 const newUser=await User.create({name,email,password:hashedPassword}) 
      const token=generateToken(newUser._id.toString());
      
      return res.json({success:true,token})

        
        
    } catch (error) {
        console.log(error.message);
        return res.json({success:false,message:"Error Occured"})
    }
}

//Login User 
export const loginUser=async(req,res)=>{
    try {
       let  {email,password}=req.body;
       const user=await User.findOne({email});
       if(!user)
       {
        return res.json({success:false,message:"user not found"})
       }
       const isMatch=await bcrypt.compare(password,user.password)

       if(!isMatch)
       {
        return res.json({success:false,message:"User not found"})
       }
       const token=generateToken(user._id.toString())
       return res.json({success:true,token})
       
    } catch (error) {
       console.log(error.message);
       return res.json({success:false,message:"Error Occured"}) 
    }
}

// get user data using jwt token

export const getUser=async(req,res)=>{
    try {
        const {user}=req;
        return res.json({success:true,user})
    } catch (error) {
        console.log(error.message)
    }
}

//get all the cars from frontend 

export const getCars=async(req,res)=>{
    try {
       const cars=await Car.findOne({isAvailable:true})
       res.json({success:true,cars})
    } catch (error) {
        console.log(error.message)
    }
}