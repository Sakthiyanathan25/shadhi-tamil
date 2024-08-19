const express = require("express");
const cors = require("cors");
const connectDB = require("./config/DbConnect");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// read urlencoded and json data
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8080"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.options("*", cors());

// routes
//contact form route
app.use("/api/contact", require("./routes/contactRoute"))
//user routes
app.use("/api/users", require("./routes/userRoute"))
//preferences routes
app.use("/api/preferences", require("./routes/preferenceRoute"))

// middleware
app.use(errorHandler);

// checking
app.get("/", (req, res) => {
    res.send("Hello, world!");
  });
  
  // start server
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }).catch((error)=>{
    console.error(`Error connecting with database: ${error}`);
  })