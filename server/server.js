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
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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
