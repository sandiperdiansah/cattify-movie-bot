import { Markup } from 'telegraf';

export const createThumbnailAction = async (ctx) => {
    await ctx.answerCbQuery();

    ctx.session.step = 'create_thumbnail';
    ctx.session.thumbnailPhoto = null;

    await ctx.deleteMessage();
    await ctx.reply(
        'send the image to be used as a thumbnail',
        Markup.forceReply(),
    );
};
