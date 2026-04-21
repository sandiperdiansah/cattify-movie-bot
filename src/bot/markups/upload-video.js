import { Markup } from 'telegraf';
import backStartMenuMarkup from './back-start-menu.js';

const uploadVideoMarkup = Markup.inlineKeyboard([
    [
        Markup.button.callback('single video', 'single_video'),
        Markup.button.callback('multiple videos', 'multiple_videos'),
    ],
    backStartMenuMarkup,
]);

export default uploadVideoMarkup;
