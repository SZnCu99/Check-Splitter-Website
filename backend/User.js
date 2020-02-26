const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const User = new Schema(
  {

    name: String,
    email: String,
    friends: [String],
    records: [mongoose.ObjectId]

    
  }
  
);





// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", User);
//module.exports = mongoose.model("Record", Record);
//module.exports = mongoose.model("Transaction", Transaction);