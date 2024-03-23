const { Schema, model } = require('mongoose');

const notificationSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        sentAt: {
            type: Date,
            default: Date.now,
            // get: timestamp => dateFormat(timestamp)
        },
        sentBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: Number,
            required: true,
        },
    },
    {
      toJSON: {
        virtuals: true
      }
    }
);

const Notification = model('Notification', notificationSchema);

module.exports = Notification;