const express = require("express");
const cors = require("cors");

const app = express();
const port = 5050;

const userRoutes = require("./router/user");
const albumRoutes = require("./router/album");
const songRoutes = require("./router/song");
const { connect, default: mongoose } = require("mongoose");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/album", albumRoutes);
app.use("/api/v1/song", songRoutes);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};
connectDB()
  .then(() => {
    console.log("Connection with Database established!");
  })
  .catch((error) => {
    console.log("Unable to connect to database", error);
  });

app.listen(port, () => {
  console.log(`server is rendering on ${port}`);
});
