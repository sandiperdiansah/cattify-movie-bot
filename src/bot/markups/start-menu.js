import { Markup } from 'telegraf';

const startMenuMarkup = Markup.inlineKeyboard([
    [
        Markup.button.callback('create thumbnail', 'create_thumbnail'),
        Markup.button.callback('upload video', 'upload_video'),
    ],
    [
        Markup.button.callback('settings', 'settings'),
    ]
]);

export default startMenuMarkup;
