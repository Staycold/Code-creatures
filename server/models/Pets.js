const { Schema, model } = require('mongoose');

const petSchema = new Schema(

    {
      petName: {
        type: String,
        required: true,
        // unique: true,
      },
     experience:{
        type: Number,
        required: true,
        unique: false,
        default: 0
     },
      level:{
          type: Number,
          required: true,
          unique: false,
          default: 1
      },
      
    experience: {
      type: Number,
      required: true,
      unique: false
    },
    level: {
      type: Number,
      required: true,
      unique: false,
      default: 1
    }
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Pets = model('Pets', petSchema);

  module.exports = {
    petSchema
  };
