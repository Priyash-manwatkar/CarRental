// import multer from "multer";

// const upload=multer({storage:multer.diskStorage({})})

// export default upload;
// backend/middleware/multer.js
// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // folder to store images
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// export const upload = multer({ storage });
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const uploadDir = 'uploads/';

// // Create uploads folder if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// export const upload = multer({ storage });
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const uploadDir = 'uploads/';

// // Create uploads folder if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// export const upload = multer({ storage });

import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Use /tmp/uploads for Vercel (writable)
const uploadDir = path.join('/tmp', 'uploads');

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // save to /tmp/uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // keep original extension
    cb(null, Date.now() + ext);
  },
});

// Optional: file filter (only allow images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const upload = multer({ storage, fileFilter });





