const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/abrsofttech", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.info("Connected to MongoDB");
  });
