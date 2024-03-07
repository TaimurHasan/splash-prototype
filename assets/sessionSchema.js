export const sessionSchema = [
    {
        _id: '1',
        isActive: false,
        startedBy: 'tester',
        startedAt: '2024-03-01T19:47:04.712Z',
        settings: {
            fgPts: '1',
            threePts: '2',
        },
        players: [
            {
                _id: 1,
                username: 'tester',
                stats: {
                    fgsMade: '2',
                    fgs: '4',
                }
            },
            {
                _id: 2,
                username: 'tester2',
                stats: {
                    fgsMade: '0',
                    fgs: '4',
                }
            }
        ],
        images: [],
        sessionDetails: {
            totalPlayers: '2',
            totalFgsMade: '2',
            totalFgs: '8',
        }
    }
];

export const activeSessionSchema = [
    {
        _id: '1',
        startedBy: 'tester',
        startedAt: '2024-03-01T19:47:04.712Z',
        settings: {
            fgPts: '1',
            threePts: '2',
        },
        players: [
            {
                _id: 1,
                username: 'tester',
                stats: {
                    fgsMade: '2',
                    fgs: '4',
                }
            },
            {
                _id: 2,
                username: 'tester2',
                stats: {
                    fgsMade: '0',
                    fgs: '4',
                }
            }
        ],
        images: [],
        sessionDetails: {
            totalPlayers: '2',
            totalFgsMade: '2',
            totalFgs: '8',
        }
    }
];  