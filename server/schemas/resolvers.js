const { User, Challenge, Pet} = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData =  await User.findOne({ _id: context.user._id }).populate('pets');
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
          }
         
         
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password});
        const token = signToken(user);
        return { token, user }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('No user found! Please check the email address you entered.')
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw new AuthenticationError('Incorrect password! Please try again.')
            }

            const token = signToken(user);
            return { token, user };
        },

        addPet: async (parent, { petName }) => {
            //create the new pet
            //update the user with the new created pet

            const pet = await Pet.create({ petName });
            const token = signToken(user);
            return { pet }
            },
        addChallenge: async (parent, args) =>{
            const question = await Challenge.create(args.challenge)
            return { question }

        }
    }
}

module.exports = resolvers;