const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoute = require('./routes/user_auth');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');

const app = express();
const port = process.env.PORT || 5000;

// ✅ Allowed origins for frontend
const allowedOrigins = [
  "http://localhost:5173",                // local dev
  "https://noteflux-mu.vercel.app",       // vercel frontend
];

// ✅ CORS setup with credentials support
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  exposedHeaders: ["set-cookie"],
}));

// ✅ Ensure preflight (OPTIONS) requests support credentials
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

//  Middleware
app.use(express.json());
app.use(cookieParser());

//  Routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comment', commentRoute);

//  Root route
app.get('/', (req, res) => {
  res.send(`🚀 Noteflux API running on port ${port}`);
});

//  Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
