import {
    downloadTelegramFile,
    generateThumbnails,
} from '../../services/image.service.js';
import logger from '../../utils/logger.js';
import startMenuMarkup from '../markups/start-menu.js';

export const generateThumbnailAction = async (ctx, count) => {
    const photoFileId = ctx.session.thumbnailPhoto;

    if (!photoFileId) {
        return await ctx.reply('thumbnail image not found');
    }

    const loadingMessage = await ctx.reply(`creating ${count} thumbnails...`);
    let imageCleanup = null;

    try {
        await ctx.deleteMessage();

        if (ctx.session.thumbnailPromptMessageId) {
            try {
                await ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.thumbnailPromptMessageId);
            } catch (_err) {
                // ignore
            }
        }

        if (ctx.session.customPromptMessageId) {
            try {
                await ctx.telegram.deleteMessage(ctx.chat.id, ctx.session.customPromptMessageId);
            } catch (_err) {
                // ignore
            }
        }

        const file = await ctx.telegram.getFile(photoFileId);
        const imageBuffer = await downloadTelegramFile(file.file_path);

        const { outputs, cleanup } = await generateThumbnails(imageBuffer, count);
        imageCleanup = cleanup;

        const mediaGroup = outputs.map((filePath, index) => ({
            type: 'photo',
            media: {
                source: filePath,
            },
            caption:
                index === outputs.length - 1
                    ? 'Original Image'
                    : `PART ${index + 1}`,
        }));

        const chunkSize = 10;
        for (let i = 0; i < mediaGroup.length; i += chunkSize) {
            const chunk = mediaGroup.slice(i, i + chunkSize);
            await ctx.replyWithMediaGroup(chunk);
        }
        
        await ctx.reply(`success created ${count} thumbnails`);
    } catch (error) {
        logger.error(error);
        await ctx.reply('failed to create thumbnails');
    } finally {
        await ctx.telegram.deleteMessage(
            ctx.chat.id,
            loadingMessage.message_id,
        );

        if (imageCleanup) {
            await imageCleanup();
        }

        ctx.session.step = null;
        ctx.session.thumbnailPhoto = null;
        ctx.session.customThumbnailCount = null;
        ctx.session.customPromptMessageId = null;
        ctx.session.thumbnailPromptMessageId = null;

        await ctx.reply('menu options currently available', startMenuMarkup);
    }
};
