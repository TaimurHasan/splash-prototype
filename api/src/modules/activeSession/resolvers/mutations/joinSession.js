const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async(parent, args, { auth, db }) => {
    if(auth.user) {
        const player = await db.ActivePlayerStats.create({
            sessionId: new ObjectId(args.sessionId),
            user: new ObjectId(auth.user._id),
        });

        if(!player) {
            throw new Error('Player not created');
        };

        const session = await db.ActiveSession.findByIdAndUpdate(
            { _id: args.sessionId },
            { $push: { players: auth.user._id, playerStats: player._id } },
            { new: true }
        );

        if(!session) {
            throw new Error('Session not found');
        };

        const user = await db.User.findByIdAndUpdate(
            { _id: auth.user._id },
            { isActive: true, activeSessionId: session._id },
            { new: true }
        );

        if(!user) {
            throw new Error('User not found');
        }
        return session;
    }
};