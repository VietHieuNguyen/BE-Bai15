const mongoose = require('mongoose');


module.exports.connect =  async () =>{
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database successfully")
  } catch (error) {
    console.log("Failed to connect to database")
  }
}



