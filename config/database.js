const mongoose = require("mongoose");
module.exports = async function ConnectiontoDB() {
  await mongoose
    .connect(
      "mongodb+srv://aznagelmehdi99:OyLKPyGp7L7HinqW@cluster0.a9vsyli.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected"));
  const db = mongoose.connection;
  db.on("disconnected", () => {
    console.log("connection disconnected");
  });
  db.on("error", () => {
    console.log("error in mongoose connection");
  });

  return mongoose;
};
