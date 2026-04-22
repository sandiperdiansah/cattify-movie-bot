import { Markup } from 'telegraf';
import backCreateThumbnailMarkup from './back-create-thumbnail.js';

const createThumbnailMarkup = Markup.inlineKeyboard([
    [
        Markup.button.callback('1', 'thumbnail_1'),
        Markup.button.callback('2', 'thumbnail_2'),
    ],
    [
        Markup.button.callback('3', 'thumbnail_3'),
        Markup.button.callback('4', 'thumbnail_4'),
    ],
    [Markup.button.callback('5', 'thumbnail_5')],
    [Markup.button.callback('custom', 'thumbnail_custom')],
    backCreateThumbnailMarkup,
]);

export default createThumbnailMarkup;
