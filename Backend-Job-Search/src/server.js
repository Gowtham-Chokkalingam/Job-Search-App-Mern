// >Importing express for server
const express = require("express");

// >Importing dotenv for safegaurding the port server
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const UserRouter = require('./routes/user.routes')
const JobRouter = require('./routes/job.routes')
const AppliedJobRouter = require('./routes/appliedJob.routes')
const cors = require("cors");

const app = express();
// meta functions
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json());

const connectDB = require("./config/db"); 
dotenv.config();
const PORT = process.env.PORT || 8080;
app.use("/", UserRouter);
app.use("/", JobRouter);
app.use("/job", AppliedJobRouter);
 
app.listen(PORT, async () => {
  connectDB();

  console.log(`Server Runs in Port ${PORT}`);
});

// var bodyParser = require('body-parser');  
  