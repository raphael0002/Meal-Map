const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please enter a email'],
    unique: [true, 'Email is already in use'],
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
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
  // favoriteRecipes: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Recipe'
  // }],
  bio: {
    type: String,
    default: 'No bio provided'
  },
  profilePicture: {
    type: String,
    default: 'default-profile-picture.jpg'
  },
  shoppingList: [{
    ingredient:[{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    }
  }]}],
  planner: [{
    recipe: {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    },
    plannedFor: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  console.log(this.password);
  this.confirmPassword = undefined; // remove confirm password field before saving in the database
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

module.exports = mongoose.model('User', userSchema);
