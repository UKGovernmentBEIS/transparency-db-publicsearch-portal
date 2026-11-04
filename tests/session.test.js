const request = require('supertest');

jest.mock('express-session', () =>
    jest.fn(({ store }) => (req, res, next) => {
        res.set('X-Session-Store', store.kind);
        next();
    }),
);
jest.mock(
    'memorystore',
    () => () => jest.fn().mockImplementation(() => ({ kind: 'memory' })),
);
jest.mock('connect-redis', () => ({
    RedisStore: jest.fn().mockImplementation(() => ({ kind: 'redis' })),
}));
jest.mock('redis', () => ({
    createClient: jest.fn(),
    SocketTimeoutError: class SocketTimeoutError extends Error {},
}));

describe('Session store selection', () => {
    const originalRedisEnabled = process.env.REDIS_ENABLED;
    let redisClient;
    let app;

    beforeEach(() => {
        jest.resetModules();
        redisClient = {
            isReady: false,
            on: jest.fn(),
            connect: jest.fn().mockResolvedValue(undefined),
        };
        require('redis').createClient.mockReturnValue(redisClient);
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
        if (originalRedisEnabled === undefined) {
            delete process.env.REDIS_ENABLED;
        } else {
            process.env.REDIS_ENABLED = originalRedisEnabled;
        }
    });

    const expectStore = async (kind) => {
        await request(app).get('/').expect(200).expect('X-Session-Store', kind);
    };

    test('uses memory without connecting when Redis is disabled', async () => {
        process.env.REDIS_ENABLED = 'false';
        app = require('../app');

        await expectStore('memory');
        expect(redisClient.connect).not.toHaveBeenCalled();
    });

    test('uses memory before Redis is ready and during outages, then recovers', async () => {
        process.env.REDIS_ENABLED = 'true';
        app = require('../app');

        await expectStore('memory');
        redisClient.isReady = true;
        await expectStore('redis');
        redisClient.isReady = false;
        await expectStore('memory');
        redisClient.isReady = true;
        await expectStore('redis');
    });

    test('continues serving with memory after an initial connection failure', async () => {
        process.env.REDIS_ENABLED = 'true';
        redisClient.connect.mockRejectedValue(new Error('Redis unavailable'));
        app = require('../app');

        await expectStore('memory');
        expect(console.error).toHaveBeenCalled();
    });
});
