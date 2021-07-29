const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Pet.js
const petSchema = require('./Pets');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set pets to be an array of data that adheres to the petSchema
    pets: [petSchema],
    inventory: [
      {
        apple: {
          type: Number,
          required: true,
          default: 0,
        },
      }
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('petCount').get(function () {
  return this.pets.length;
});

const User = model('User', userSchema);

module.exports = User;
