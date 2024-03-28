module.exports = async(parent, args, { auth, db }) => {
    if(auth.user) {
        const session = await db.ActiveSession.create({
            startedBy: auth.user.username,
            settings: '1',
            players: [auth.user._id],
        });

        if(!session) {
            throw new Error('Session not created');
        };

        if(args.players.length > 0) {
            args.players.forEach(async id => {
                await db.Notification.create({ recipientId: id, senderId: auth.user._id, type: 1 });
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