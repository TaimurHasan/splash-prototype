module.exports = async(parent, args, { db }) => {
    return db.User.find()
        .select('-__V -password');
};