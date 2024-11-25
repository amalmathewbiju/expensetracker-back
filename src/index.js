const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Define your frontend URL
const allowedOrigins = [
  'https://67441d6f2fff0000087b6ea0--dashing-semifreddo-b93e1d.netlify.app',  // Netlify URL
  'https://your-frontend-domain.com', // Add any other frontend URLs you want to allow
];

// Configure CORS with specific origins
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);  // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Enable credentials if needed
};

app.use(cors(corsOptions));  // Use the customized CORS configuration

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit if DB connection fails
  });

// API Routes
app.use('/api', routes);

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
