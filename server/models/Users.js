const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String,},
}, {
  timestamps: true 
});

const UserModel = mongoose.model("UsersCollection", UserSchema);

module.exports = UserModel;
