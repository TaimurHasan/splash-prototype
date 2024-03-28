const { Schema, model } = require('mongoose');

const notificationSchema = new Schema(
    {
        sentAt: {
            type: Date,
            default: Date.now,
            // get: timestamp => dateFormat(timestamp)
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        recipientId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: Number,
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        isActivated: {
            type: Boolean,
            default: false,
        }
    },
    {
      toJSON: {
        virtuals: true
      }
    }
);

const Notification = model('Notification', notificationSchema);

module.exports = Notification;