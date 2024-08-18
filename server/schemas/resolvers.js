const {User} = require('../models');
const {signToken, AuthenticationError} = require('../utils/auth');
const {getFeaturedPlaylists} = require('../utils/spotify');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },

        user: async (parent, {username}) => {
            return User.findOne({username});
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id});
            }
            throw AuthenticationError;
        },

        featuredPlaylists: async () => {
            try {
                const data = await getFeaturedPlaylists();
                return data.playlists.items.map(item => ({
                    id: item,
                    name: item.name,
                    external_urls: item.external_urls
                }));
            } catch (error) {
                throw new Error('Failed to fetch playlists');
            }
        }
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return {token, user};
        },
    },
};

module.exports = resolvers;