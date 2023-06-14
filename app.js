import express from 'express'
import session from "express-session";
import cors from 'cors'
import HelloController from "./controllers/hello-controller.js"
import UserController from './controllers/users/users-controller.js'
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./controllers/users/auth-controller.js";

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
    origin: "https://a5--strong-sunburst-f71874.netlify.app",
  })
);

TuitsController(app);
HelloController(app)
UserController(app)
AuthController(app);
app.listen(process.env.PORT || 4000);