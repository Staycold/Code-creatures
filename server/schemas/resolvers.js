const { User, Challenge, Pet } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate('pets');
        return userData
      }
      throw new AuthenticationError('You need to be logged in to view this!');
    },
    users: async (parent, args, context) => {
      const users = await User.find({});
      return users
    },

    challenges: async () => {
      const challenges = await Challenge.find({});
      return challenges
    },
    pets: async () => {
      const pets = await Pet.find({});
      return pets
    },
    challenge: async (parent, { challengeId }) => {
      const oneChallenge = await Challenge.findOne({ _id: challengeId });
      return oneChallenge
    }


  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const inventory = { food1: 0, food2: 0, food3: 0 }
      const user = await User.create({ username, email, password, inventory });
      const token = signToken(user);
      return { token, user }
    },

    mutateInv: async (parent, { invData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged');
      }
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { inventory: invData } },
        { new: true }
      )

      return user;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found! Please check the email address you entered.')
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password! Please try again.')
      }

      const token = signToken(user);
      return { token, user };
    },

    addPet: async (parent, { petData }, context) => {

      const pet = await Pet.create(petData)
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { pets: pet } },
        { new: true }
      )

      return user
    },
    addChallenge: async (parent, args) => {
      const question = await Challenge.create(args.challenge)
      return { question }
    },
    addExp: async (parent, args, context) => {
      const expGain = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $inc: { 'pets.0.experience': args.petExp } },
        { new: true }
      )
      return expGain
    },
    addHappiness: async (parent, args, context) => {
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $inc: { 'pets.0.happiness': args.hapValue } },
        { new: true }
      )
      return user
    },
    addCoins: async (parent, args, context) => {
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $inc: { 'inventory.coins': args.coins } },
        { new: true }
      )
      return user
    },
    updateLvl: async ( parent, {petExp, petLvl}, context) => {
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $set:{'pets.0.experience': petExp,
         'pets.0.level': petLvl}},
         {new: true}        
      )
      return user 
    }
  }
}

module.exports = resolvers;