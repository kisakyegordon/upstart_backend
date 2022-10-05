import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import dotenv from "dotenv";
import userRoutes from './app/routes/userRoutes.js';
import todoRoutes from './app/routes/todoRoutes.js';
import pollsRoutes from './app/routes/pollsRoutes.js';

const corsOptions = {
  origin: "http://localhost:3000"
};

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoutes);
app.use("/api/v1", todoRoutes);
app.use("/api/v1", pollsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



// app.post("/api/v1", () => console.log("Boom"));




// https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66



/**
 0. users -> email(varchar), password, 
 1. Poll -> Id, Title, optionA, optionB, optionC, optionD, user_id(FK)
 2. Stats ->  FK(poll_id), optionA(incrementing based off selection), optionB, optionC, optionD
 
 1. Create Tables
 2. Create Endpoints -> polls (create, update, view polls + options)
 */