import './config/env.js';
import express from 'express';
import bot from './bot/index.js';
import logger from './utils/logger.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Cattify Movie Bot is running!');
});

// Start bot
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Start local server
const PORT = process.env.APP_PORT || 8000;

app.listen(PORT, () => {
    logger.info(`server is running http://localhost:${PORT}`);
});

export default app;
