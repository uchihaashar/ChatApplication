import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet'; // Helmet middleware import
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not defined

// Middleware for JSON parsing
app.use(express.json());

// Add Helmet for security headers, including CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow resources from the same origin
      scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts (temporary for dev)
      imgSrc: ["'self'", "data:"], // Allow images from the same origin and data URIs
    },
  })
);

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
