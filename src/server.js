require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import mongoose from "mongoose";

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAME;

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Mongodb connected successfully");
});

let app = express();

viewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("App is running at the port:", port);
});
