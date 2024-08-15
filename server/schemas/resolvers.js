const {User} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, {userId}) => {
            return User.findOne({_id: userId});
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id});
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!profile) {
                throw AuthenticationError;
            }

            const correctPw = await profile.isCorrectPassword(password);
            if(!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return {token, user};
        },

        removeUser: async (parent, args, context) => {
            if(context.user) {
                return User.findOneAndDelete({_id: context.user._id});
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;