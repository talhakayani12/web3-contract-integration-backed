const mongoose = require("mongoose");
const swapping = require("./swapping.database");

let $connection = false;
// mongoose.set("debug", true);
const connect = () => {
  // If connection is already established
  if ($connection) {
    return $connection;
  }

  const mongoUri = process.env.DATABASE_URL;
  $connection = mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
    })
    .then(() => {
      console.log("MongoDB connection established successfully!");
    })
    .catch((error) => {
      console.log("MongoDB connection failed with error: ", error);
    });

  return $connection;
};

module.exports = { connect, swapping };
