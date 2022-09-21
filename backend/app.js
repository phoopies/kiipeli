const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
var multer = require("multer");
require("dotenv").config();
require("express-async-errors");

const config = require("./util/config");
const middleware = require("./util/middleware");
const authRouter = require("./controllers/auth");
const wallsRouter = require("./controllers/walls");
const routesRouter = require("./controllers/routes");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connection to MongoDB:", error);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TODO: What is this
app.use(morgan("common"));
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "../frontend", "build")));

// ...
// Right before your app.listen(), add this:
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
});

app.use(middleware.tokenExtractor);

app.use("/api/auth", authRouter);
app.use("/api/walls", wallsRouter);
app.use("/api/routes", routesRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
