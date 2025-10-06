// import jwt from 'jsonwebtoken'
// import User from '../model/User.js';

// export const protect=async(req,res,next)=>{
//   const token=req.headers.authorization;
//   if(!token)
//   {
//     return res.json({success:false,message:"not authorized"})
//   }

//   try {
//     const userId=jwt.decode(token,process.env.JWT_SECRET)

//     if(!userId)
//     {
//         return res.json({success:false,message:"not authorized"})
//     }
//     req.user=await User.findById(userId).select("-password")
//     next()
//   } catch (error) {
//     console.log(error.message);
//     return res.json({success:false,message:"error occured"})
//   }
// }

// import jwt from "jsonwebtoken";
// import User from "../model/User.js";

// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // Extract token
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach user to req
//       req.user = await User.findById(decoded.id).select("-password");

//       if (!req.user) {
//         return res.status(401).json({ success: false, message: "User not found" });
//       }

//       next();
//     } catch (error) {
//       console.log(error.message);
//       return res.status(401).json({ success: false, message: "Not authorized, token failed" });
//     }
//   } else {
//     return res.status(401).json({ success: false, message: "Not authorized, no token" });
//   }
// };

// import jwt from "jsonwebtoken";
// import User from "../model/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "Not authorized" });
//     }

//     const token = authHeader.split(" ")[1]; // Remove "Bearer "

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");

//     next();
//   } catch (error) {
//     console.error(error.message);
//     return res.status(401).json({ success: false, message: "Token invalid or expired" });
//   }
// };

import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer "
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};


