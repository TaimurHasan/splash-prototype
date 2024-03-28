const { ActiveSession, User, Notification } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const ObjectId = require('mongoose').Types.ObjectId; 

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    // .populate({
                    //     path: 'notifications',
                    //     populate: [{ path: 'sentBy'}],
                    //     populate: [{ path: 'sentBy'}],
                    // })
                
                return userData;
            }
            
            throw new AuthenticationError('Not logged in');
        },
        users: async() => {
            return User.find()
                .select('-__V -password')
                // .populate({
                //     path: 'notifications',
                //     populate: [{ path: 'sentBy'}],
                // })
        },
        user: async(parent, { username }) => {
            return User.findOne({ username })
                .select('-__V -password')
                .populate('friends')
                .populate('thoughts');
        },
        activeSession: async(parent, { id }) => {
            const session = await ActiveSession.findById(id);
            return session;
        },
        myNotifications: async(parent, args, context) => {
            if(context.user) {
                const notifications = Notification.find( { recipientId: new ObjectId(context.user._id) })
                    .populate('senderId');
                return notifications;
            };
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            
            const token = signToken(user);
            return { token, user };
        },
        addSession: async(parent, args, context) => {
            if(context.user) {
                const session = await ActiveSession.create({
                    startedBy: context.user.username,
                    settings: '1',
                    players: [context.user._id],
                });

                if(!session) {
                    throw new Error('Session not created');
                };

                if(args.players.length > 0) {
                    args.players.forEach(async id => {
                        await Notification.create({ recipientId: id, senderId: context.user._id, type: 1 });
                    });
                };
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { isActive: true, activeSessionId: session._id },
                    { new: true }
                );

                if(!user) {
                    throw new Error('User not found');
                }
                return session;
            }
        },
        endSession: async(parent, { sessionId }, context) => {
            if(context.user) {
                await ActiveSession.findByIdAndDelete(sessionId);
            
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { isActive: false, activeSessionId: null },
                    { new: true }
                )

                return user;
            }
        }
    }
};

module.exports = resolvers;