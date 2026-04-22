import { Telegraf } from 'telegraf';

import sessionMiddleware from './middlewares/session.js';
import { startCommand } from './commands/start.js';

import { createThumbnailAction } from './actions/create-thumbnail.js';
import { customThumbnailAction } from './actions/custom-thumbnail.js';
import { generateThumbnailAction } from './actions/generate-thumbnail.js';
import {
    uploadVideoAction,
    backStartMenuAction,
    backCreateThumbnailAction,
    backUploadVideoAction,
} from './actions/navigation.js';

import { uploadThumbnailPhotoHandler } from './handlers/photo.js';
import { customThumbnailCountHandler } from './handlers/message.js';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.use(sessionMiddleware);

bot.start(startCommand);

// Create Thumbnail
bot.action('create_thumbnail', createThumbnailAction);
bot.on('photo', uploadThumbnailPhotoHandler);

bot.action('thumbnail_custom', customThumbnailAction);

bot.on('message', async (ctx, next) => {
    await customThumbnailCountHandler(ctx, next);

    if (ctx.session.step === 'ready_custom_thumbnail') {
        const count = ctx.session.customThumbnailCount;
        return generateThumbnailAction(ctx, count);
    }
});

bot.action(/thumbnail_(\d+)/, async (ctx) => {
    const count = Number(ctx.match[1]);
    return generateThumbnailAction(ctx, count);
});

// Upload Video
bot.action('upload_video', uploadVideoAction);

// Back buttons Navigation
bot.action('back_start_menu', backStartMenuAction);
bot.action('back_create_thumbnail', backCreateThumbnailAction);
bot.action('back_upload_video', backUploadVideoAction);

export default bot;
