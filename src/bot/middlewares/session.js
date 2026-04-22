import { session } from 'telegraf';

const sessionMiddleware = session({
    defaultSession: () => ({
        waitingForCustomPart: false,
    }),
});

export default sessionMiddleware;
