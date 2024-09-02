const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const cookSchema = new Schema({
    username:{
      type: 'string',
      required: true,
      unique: [true, 'Please enter a username']
    },
    password:{
      type: 'string',
      required: [true, 'please enter your password'],
      Select: false
    },
    confirmPassword:{
      type: 'string',
      required: [true, 'please enter your password'],
      validate: {
        validator: function(value) {
          return value === this.password;
        }
      }
    },
    email:{
      type: 'string',
      required: [true, 'Please enter your email'],
      unique: [true, 'This email is already in use'],
      validate: [validator.isEmail, 'Please enter a valid email']
    },
    myRecipes:[
        {
            type:Schema.Types.ObjectId,
            ref:'Recipe'
        }
    ],

    bio: {
      type: String,
      default: ''
    },
    profilePicture: {
      type: String,
      default: 'default-profile-picture.jpg'
    },
    createdAt:{
      type:Date,
      default:Date.now
  }
  });

  cookSchema.pre('save', async function(next) {
    console.log(this.password, this.confirmPassword)  ;
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined; // remove confirm password field before saving in the database
    next();
  });

  cookSchema.methods.comparePassword = async function(candidatePassword, userPassword) {
      return await bcrypt.compare(candidatePassword, userPassword);
    };

  module.exports = mongoose.model('Cook', cookSchema);
  