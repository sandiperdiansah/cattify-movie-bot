import './config/env.js';

import bot from './bot/index.js';
import logger from './utils/logger.js';

// Start bot
bot.launch(() => {
    logger.info('application started');
}).catch((error) => {
    logger.error('failed to start application:', error);
    process.exit(1);
});

process.once('SIGINT', () => {
    logger.info('shutting down...');
    bot.stop('SIGINT');
    process.exit(0);
});

process.once('SIGTERM', () => {
    logger.info('shutting down...');
    bot.stop('SIGTERM');
    process.exit(0);
});
