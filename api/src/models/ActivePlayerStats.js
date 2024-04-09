const { Schema, model } = require('mongoose');

const activePlayerStatsSchema = new Schema(
    {
        sessionId: {
            type: Schema.Types.ObjectId,
            ref: 'ActiveSession',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        FGS: {
            type: Number,
            default: 0,
        },
        PTS: {
            type: Number,
            default: 0,
        },
        TPM: {
            type: Number,
            default: 0,
        },
        REB: {
            type: Number,
            default: 0,
        },
        BLK: {
            type: Number,
            default: 0,
        },
        STL: {
            type: Number,
            default: 0,
        },
    },
    {
      toJSON: {
        virtuals: true
      }
    }
);

const ActivePlayerStats = model('ActivePlayerStats', activePlayerStatsSchema);

module.exports = ActivePlayerStats;