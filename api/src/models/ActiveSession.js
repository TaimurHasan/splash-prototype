const { Schema, model } = require('mongoose');

const playerStatsSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    }
)

const sessionDetailsSchema = new Schema(
    {
        totalFgsMade: {
            type: String,
        },
    }
)

const activeSessionSchema = new Schema(
    {
        startedBy: {
            type: String,
            required: true,
        },
        startedAt: {
            type: Date,
            default: Date.now,
            // get: timestamp => dateFormat(timestamp)
        },
        settings: {
            type: String,
            required: true,
        },
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        playerStats: [playerStatsSchema],
        sessionDetails: sessionDetailsSchema,
    },
    {
      toJSON: {
        virtuals: true
      }
    }
);

activeSessionSchema.virtual('totalPlayers').get(function() {
    return this.players.length;
  });

const ActiveSession = model('ActiveSession', activeSessionSchema);

module.exports = ActiveSession;