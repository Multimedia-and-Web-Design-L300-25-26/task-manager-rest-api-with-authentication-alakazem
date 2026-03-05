import app from "../src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load test environment
process.env.NODE_ENV = 'test';
dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  // Ensure we're using test database
  process.env.MONGO_URI = 'mongodb://localhost:27017/taskmanager_test';
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
});

export default app;