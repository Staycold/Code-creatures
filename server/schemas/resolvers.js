const { User, Pets, Challenge, Answer } = require('../models')
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

          challenges: async () => {
              return Challenge.find();
          }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {;
        const user = await User.create({ username, email, password });
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

        addPet: async (parent, { petName }) => {;
            const pet = await Pets.create({ petName });
            //const token = signToken(user);
            return { pet }
            },

    }
}

module.exports = resolvers;