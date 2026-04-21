import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

sharp.cache(false);

const TEMP_DIR = path.join(process.cwd(), 'temp');

export const downloadTelegramFile = async (filePath) => {
    const url = `${process.env.TELEGRAM_API_FILE_URL}${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
};

export const generateThumbnails = async (imageBuffer, count) => {
    await fs.mkdir(TEMP_DIR, { recursive: true });

    const timestamp = Date.now();
    const metadata = await sharp(imageBuffer).metadata();
    const width = metadata.width ?? 1080;
    const height = metadata.height ?? 1920;

    const aspectRatio = width / height;
    const isLandscape = aspectRatio > 1;

    const boxWidth = isLandscape
        ? Math.floor(width * 0.22)
        : Math.floor(width * 0.34);

    const boxHeight = isLandscape
        ? Math.floor(height * 0.09)
        : Math.floor(height * 0.065);

    const boxX = Math.floor((width - boxWidth) / 2);
    const boxY = Math.floor(height * 0.45);

    const fontSize = isLandscape
        ? Math.max(Math.floor(width * 0.022), 24)
        : Math.max(Math.floor(width * 0.028), 26);

    const outputs = [];

    for (let index = 0; index < count; index++) {
        const i = index + 1;
        const outputPath = path.join(
            TEMP_DIR,
            `thumbnail-part-${i}-${timestamp}.png`,
        );

        const svgText = `
        <svg width="${boxWidth}" height="${boxHeight}">
            <rect
                x="0"
                y="0"
                width="${boxWidth}"
                height="${boxHeight}"
                fill="white"
                fill-opacity="0.7"
            />

            <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
                font-size="${fontSize}"
                fill="black"
                fill-opacity="0.88"
                font-family="Arial, sans-serif"
                font-weight="400"
            >
                PART ${i}
            </text>
        </svg>
        `;

        await sharp(imageBuffer)
            .composite([
                {
                    input: Buffer.from(svgText),
                    top: boxY,
                    left: boxX,
                },
            ])
            .png()
            .toFile(outputPath);

        outputs.push(outputPath);
    }

    const originalOutputPath = path.join(
        TEMP_DIR,
        `thumbnail-original-${timestamp}.png`,
    );
    await sharp(imageBuffer).png().toFile(originalOutputPath);
    outputs.push(originalOutputPath);

    return {
        outputs,
        cleanup: async () => {
            try {
                await Promise.all(outputs.map((file) => fs.unlink(file)));
            } catch (_err) {
                // ignore if already deleted
            }
        },
    };
};
