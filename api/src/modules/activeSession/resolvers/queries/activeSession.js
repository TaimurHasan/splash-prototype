module.exports = async(parent, { id }, { auth, db }) => {
    if(auth.user) {
        const session = await db.ActiveSession.findById(id);
        return session;
    }
};