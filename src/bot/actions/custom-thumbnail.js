import { Markup } from 'telegraf';

export const customThumbnailAction = async (ctx) => {
    await ctx.answerCbQuery();
    ctx.session.step = 'custom_thumbnail_count';
    const msg = await ctx.reply(
        'send the thumbnail count you want',
        Markup.forceReply(),
    );
    ctx.session.customPromptMessageId = msg.message_id;
    ctx.session.thumbnailPromptMessageId = ctx.callbackQuery.message.message_id;
};
