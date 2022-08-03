import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import dotenv from "dotenv";
import userRoutes from './app/routes/userRoutes.js';
import todoRoutes from './app/routes/todoRoutes.js';

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



// app.post("/api/v1", () => console.log("Boom"));




// https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66