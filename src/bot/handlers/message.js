export const customThumbnailCountHandler = async (ctx, next) => {
    if (ctx.session.step === 'create_thumbnail') {
        if ('photo' in ctx.message) {
            return next();
        }

        return await ctx.reply(
            'only one image is allowed. please send a photo, not video, file, sticker, or document',
        );
    }

    if (ctx.session.step === 'custom_thumbnail_count') {
        if (!('text' in ctx.message)) {
            return await ctx.reply('please send number only');
        }

        const count = Number(ctx.message.text);

        if (isNaN(count)) {
            return await ctx.reply('please send valid number');
        }

        if (count < 1) {
            return await ctx.reply('minimum thumbnail count is 1');
        }

        if (count > 100) {
            return await ctx.reply('maximum thumbnail count is 100');
        }

        ctx.session.customThumbnailCount = count;
        ctx.session.step = 'ready_custom_thumbnail';

        return next();
    }

    return next();
};
