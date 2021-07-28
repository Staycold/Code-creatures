const { Schema, model } = require('mongoose');

const petSchema = new Schema(
    {
      petname: {
        type: String,
        required: true,
        unique: true,
      },
     experience:{
        type: Number,
        required: true,
        unique: false
     },
      level:{
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

  module.exports = Pets;