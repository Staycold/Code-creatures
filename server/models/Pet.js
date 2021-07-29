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
    },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


const Pet = model('Pet', petSchema);

  module.exports = {
    Pet,
    petSchema
  };
