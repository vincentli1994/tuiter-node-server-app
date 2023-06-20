import express from 'express'
import session from "express-session";
import cors from 'cors'
import HelloController from "./controllers/hello-controller.js"
import UserController from './controllers/users/users-controller.js'
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./controllers/users/auth-controller.js";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
// const CONNECTION_STRING = "mongodb+srv://vincent-li:vincent355165@tuiter.lo0nvw9.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
  session({
    secret: "any string",
    resave: false,
    saveUninitialized: true,
  })
);


app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

TuitsController(app);
HelloController(app)
UserController(app)
AuthController(app);
app.listen(process.env.PORT || 4000);