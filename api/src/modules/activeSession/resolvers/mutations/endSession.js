module.exports = async(parent, { sessionId }, { db, auth }) => {
    if(auth.user) {
        await db.ActiveSession.findByIdAndDelete(sessionId);
    
        const user = await db.User.findByIdAndUpdate(
            { _id: auth.user._id },
            { isActive: false, activeSessionId: null },
            { new: true }
        )

        return user;
    }
}