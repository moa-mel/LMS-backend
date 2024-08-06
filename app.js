const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const fellowRouter = require("./routes/fellowRoute")
const adminRoute = require("./routes/adminRoute")

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}))
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use('/api', fellowRouter)
app.use('', adminRoute)


mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("connected to the database"))
  .catch((err) => console.error("unable to connect", err));

const port = process.env.PORT;

app.listen(port, () =>{
    console.log(`server connected to ${port}`)
})