const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  date: {
    type: String,
    required: true,
    default: Date.now
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
});

const UserMaster = mongoose.model('user_master', UserSchema);
module.exports = UserMaster;