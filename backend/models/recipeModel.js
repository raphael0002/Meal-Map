const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: {
      type: String,
      required: [true, "A recipe name must be provided"]
    },
    description: {
      type: String,
      required: [true, "A recipe description must be provided"]
    },
    ingredients: [{
      name: {
        type: String,
        required: [true, "A recipe name must be provided"]
      },
      quantity: {
        type: String,
        required: [true, "A recipe quantity must be provided"]
      }
    }],
    steps: [{
      stepNumber: {
        type: Number,
        required: [true, "A recipe step number must be provided"]
      },
      instruction: {
        type: String,
        required: [true, "A recipe instruction must be provided"]
      }
    }],
    category:[{
      type:String,
    }],
    cook: {
      type: Schema.Types.ObjectId,
      ref: 'Cook',
      // required: [true, "A cook Id/name must be provided"]
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Recipe', RecipeSchema);
  