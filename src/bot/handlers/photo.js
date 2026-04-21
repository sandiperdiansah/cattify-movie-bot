import createThumbnailMarkup from '../markups/create-thumbnail.js';

export const uploadThumbnailPhotoHandler = async (ctx) => {
    if (ctx.session.step !== 'create_thumbnail') return;

    const photo = ctx.message.photo.at(-1);

    if (!photo) {
        return await ctx.reply('please send one image only');
    }

    ctx.session.thumbnailPhoto = photo.file_id;
    ctx.session.step = 'choose_thumbnail_count';

    await ctx.replyWithPhoto(photo.file_id, {
        caption: 'choose how many thumbnail parts you want to create',
        ...createThumbnailMarkup,
    });
};
