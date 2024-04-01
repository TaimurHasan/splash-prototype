module.exports = async(parent, args, { auth, db }) => {
    if(auth.user) {
        let notifications = [];
        args?.unreadNotifications?.forEach(async (unreadId) => {
            const notification = await db.Notification.findByIdAndUpdate(
                { _id: unreadId },
                { isRead: true },
                { new: true }
            );
            notifications.push(notification);
        });
        return notifications;
    };
};