const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

async function optimizeImages() {
    console.log('🖼️  Image Optimization Script\n');
    console.log('Scanning:', imagesDir, '\n');

    if (!fs.existsSync(imagesDir)) {
        console.error('❌ Images directory not found!');
        return;
    }

    const images = fs.readdirSync(imagesDir).filter(f => 
        f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')
    );

    if (images.length === 0) {
        console.log('No images found to optimize.');
        return;
    }

    console.log(`Found ${images.length} images to optimize:\n`);

    for (const image of images) {
        const inputPath = path.join(imagesDir, image);
        const outputPath = path.join(
            imagesDir, 
            image.replace(/\.(png|jpg|jpeg)$/i, '.webp')
        );

        // Skip if WebP already exists and is newer
        if (fs.existsSync(outputPath)) {
            const inputStat = fs.statSync(inputPath);
            const outputStat = fs.statSync(outputPath);
            if (outputStat.mtime > inputStat.mtime) {
                console.log(`⏭️  Skipping ${image} (WebP already exists and is newer)`);
                continue;
            }
        }

        try {
            console.log(`🔄 Optimizing ${image}...`);

            // Get original size
            const originalSize = fs.statSync(inputPath).size;

            // Optimize and convert
            await sharp(inputPath)
                .resize(1920, null, { 
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({ 
                    quality: 75,
                    effort: 6 // Higher effort = better compression
                })
                .toFile(outputPath);

            // Get new size
            const newSize = fs.statSync(outputPath).size;
            const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

            console.log(`   ✅ ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${savings}% smaller)`);
            console.log(`   📁 Saved to: ${path.basename(outputPath)}\n`);

        } catch (error) {
            console.error(`   ❌ Error optimizing ${image}:`, error.message, '\n');
        }
    }

    console.log('✨ Optimization complete!\n');
    console.log('Next steps:');
    console.log('1. Update image src paths to use .webp extension');
    console.log('2. Test images in browser');
    console.log('3. Run Lighthouse audit to verify improvements');
}

// Run the optimization
optimizeImages().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
