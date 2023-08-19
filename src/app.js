const express = require("express");
const app = express();
require("../src/db/conn");
const router = require("./routers/productroute");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");

const port = process.env.PORT || 4000;
const Product = require("../src/models/products");
const { verifyAccessToken } = require("./helpers/jwt_helpers");
require('dotenv').config();
console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
require("./helpers/init_redis");

const AuthRoute = require("./routers/Auth.route");

// client.SET('foo','bar')

// client.GET('foo',(err,value)=>{
//   if(err) console.log(err)
//   console.log(value)
// })

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/auth", AuthRoute);

app.get('/', verifyAccessToken, async (req, res, next) => {
  console.log("heyyy")
  res.send('Hello from express.')
})

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
