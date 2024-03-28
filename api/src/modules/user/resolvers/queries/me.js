module.exports = async (parent, args, { auth, db }) => {
    if(auth.user) {
        const userData = await db.User.findOne({ _id: auth.user._id })
            .select('-__v -password')
        
        return userData;
    }
    
    throw new AuthenticationError('Not logged in');
};