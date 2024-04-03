module.exports = async(parent, args, { auth, db }) => {
    if(auth.user) {
        const session = await db.ActiveSession.findByIdAndUpdate(
            { _id: args.sessionId },
            { $push: { players: auth.user._id } },
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