require('dotenv').config();
const mysql = require('mysql2');

// Create connection pool (same config as before)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,       // Prevents idle disconnects
  keepAliveInitialDelay: 0,   // Immediately enable keep-alive
});

// Test connection (optional)
db.getConnection((err, connection) => {
  if (err) {
    console.error('DB Connection Failed:', err.message);
  } else {
    console.log('DB Connected');
    connection.release();
  }
});

// Monkey-patch to auto-handle connection errors
db.on('error', (err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Database connection was closed.');
  } else {
    console.error('Database error:', err);
  }
});

// Export the original pool (unchanged)
module.exports = db;