const { signToken } = require("../../../../utils/auth");

module.exports = async (parent, args, { db }) => {
    const user = await db.User.create(args);
    const token = signToken(user);

    return { token, user };
};