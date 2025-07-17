const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const cookieParser = require('cookie-parser');
const authRoute = require('./routes/user_auth');

const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const cors = require('cors');

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Required for cookies
  exposedHeaders: ["set-cookie"] // Ensure cookies are exposed to frontend
}));
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);

app.use('/api/posts', postRoute);
app.use('/api/comment', commentRoute);

app.get('/', (req, res) => {
  res.send(`Server running successfully on port ${port}...`);
});

app.listen(port, () => {
  console.log(`🚀 Listening on http://localhost:${port}`);
});
