import startMenuMarkup from '../markups/start-menu.js';

export const startCommand = async (ctx) => {
    ctx.session.step = null;
    ctx.session.thumbnailPhoto = null;

    await ctx.reply('menu options currently available', startMenuMarkup);
};
