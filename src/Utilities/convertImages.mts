import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputFolder = path.resolve('src/assets/imgs'); // source folder
const outputFolder = inputFolder; // keep WebP images in the same folder

async function convertImagesToWebp() {
    // Read all files in the folder
    const files = fs.readdirSync(inputFolder).filter(file => file.endsWith('.jpg'));

    for (const file of files) {
        const inputPath = path.join(inputFolder, file);
        const outputPath = path.join(outputFolder, `${path.parse(file).name}.webp`);

        await sharp(inputPath)
        .webp({ quality: 80 }) 
        .toFile(outputPath);
    }

    console.log('All JPG images converted to WebP successfully!');
}

// Run the conversion
convertImagesToWebp().catch(err => console.error('Error converting images:', err));
