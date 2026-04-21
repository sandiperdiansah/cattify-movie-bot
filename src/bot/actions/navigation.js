import startMenuMarkup from '../markups/start-menu.js';
import uploadVideoMarkup from '../markups/upload-video.js';

export const uploadVideoAction = async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText('choice of upload type provided', uploadVideoMarkup);
};

export const backStartMenuAction = async (ctx) => {
    await ctx.answerCbQuery();
    ctx.session.step = null;
    ctx.session.thumbnailPhoto = null;
    await ctx.editMessageText('menu options currently available', startMenuMarkup);
};

export const backCreateThumbnailAction = async (ctx) => {
    await ctx.answerCbQuery();
    ctx.session.step = 'create_thumbnail';
    ctx.session.thumbnailPhoto = null;
    await ctx.deleteMessage();
    await ctx.reply('send the image to be used as a thumbnail');
};

export const backUploadVideoAction = async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText('choice of upload type provided', uploadVideoMarkup);
};
