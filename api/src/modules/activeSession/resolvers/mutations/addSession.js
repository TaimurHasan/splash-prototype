const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async(parent, args, { auth, db }) => {
    if(auth.user) {
        const commonId = new ObjectId();
        const player = await db.ActivePlayerStats.create({
            sessionId: commonId,
            userId: new ObjectId(auth.user._id),
        });

        if(!player) {
            throw new Error('Player not created');
        };

        const session = await db.ActiveSession.create({
            _id: commonId,
            startedBy: auth.user.username,
            settings: '1',
            players: [auth.user._id],
            playerStats: [player._id],
        });

        if(!session) {
            throw new Error('Session not created');
        };

        if(args.players.length > 0) {
            args.players.forEach(async id => {
                await db.Notification.create({ 
                    recipientId: id, 
                    senderId: auth.user._id, 
                    type: 1,
                    sessionId: session._id,
                });
            });
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