import dotenv from "dotenv";
import express, { Response, Request } from "express";
import { connectDB } from '@config/database';
import compression from "compression";
import { limiter } from "@middlewares/limiter";
import helmet from "helmet";
import { user } from '@routes/index';
import cors from 'cors';

const app = express();
// change default environment path
dotenv.config({ path: "./.env" });
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(limiter);

// All routes should live here
app.use('/api/user', user);

const port = process.env.PORT || 3000;
const host = process.env.APP_HOSTNAME || "localhost";
const url = process.env.APP_URL || `http://${host}:${port}`;

// listen to port
app.listen(port, async () => {

  // connect to database
  const { connection } = await connectDB();
  console.log(`👋 Connected to database successfully: ${connection.name}`);
  console.log(`🚀 Server ready at: ${url}`);
  
});