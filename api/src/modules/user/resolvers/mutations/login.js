const { signToken } = require("../../../../utils/auth");

module.exports = async (parent, { email, password }, { db }) => {
    const user = await db.User.findOne({ email });

    if(!user) {
        throw new AuthenticationError('Incorrect credentials');
    }

    const correctPw = await user.isCorrectPassword(password);

    if(!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
    }
    
    const token = signToken(user);
    return { token, user };
};