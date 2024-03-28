const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async(parent, args, { auth, db }) => {
    if(auth.user) {
        const notifications = db.Notification.find( { recipientId: new ObjectId(auth.user._id) })
            .populate('senderId');
        return notifications;
    };
};