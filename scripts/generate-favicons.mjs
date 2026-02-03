/**
 * One-time script to generate static favicon files from the orbit logo SVG.
 *
 * Usage: node scripts/generate-favicons.mjs
 * Requires: sharp (installed temporarily via the script)
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Ensure sharp is available
try {
  await import('sharp');
} catch {
  console.log('Installing sharp temporarily...');
  execSync('npm install sharp --no-save', { cwd: ROOT, stdio: 'inherit' });
}

const sharp = (await import('sharp')).default;

const svgPath = join(__dirname, 'favicon.svg');
const svgBuffer = readFileSync(svgPath);

// Generate PNGs at required sizes
const sizes = [
  { size: 48, output: join(ROOT, 'app', 'favicon-48.png') },
  { size: 192, output: join(ROOT, 'public', 'icon-192.png') },
  { size: 512, output: join(ROOT, 'public', 'icon-512.png') },
];

for (const { size, output } of sizes) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(output);
  console.log(`Generated ${output} (${size}x${size})`);
}

// Generate favicon.ico (ICO format)
// ICO is essentially a container for BMP/PNG images
// We'll create a minimal ICO file with 48x48 PNG data
const png48 = await sharp(svgBuffer)
  .resize(48, 48)
  .png()
  .toBuffer();

const png32 = await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toBuffer();

const png16 = await sharp(svgBuffer)
  .resize(16, 16)
  .png()
  .toBuffer();

// Build ICO file manually (ICO format with PNG entries)
function buildIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;

  let dataOffset = headerSize + dirSize;
  const entries = [];

  for (const png of pngBuffers) {
    entries.push({ png, offset: dataOffset });
    dataOffset += png.length;
  }

  const totalSize = dataOffset;
  const ico = Buffer.alloc(totalSize);

  // ICO header
  ico.writeUInt16LE(0, 0);      // Reserved
  ico.writeUInt16LE(1, 2);      // Type: 1 = ICO
  ico.writeUInt16LE(numImages, 4); // Number of images

  // Directory entries
  for (let i = 0; i < entries.length; i++) {
    const { png, offset } = entries[i];
    const entryOffset = headerSize + (i * dirEntrySize);

    // Get dimensions from PNG header (width/height at bytes 16-23)
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(18);

    ico.writeUInt8(width >= 256 ? 0 : width, entryOffset);      // Width (0 = 256)
    ico.writeUInt8(height >= 256 ? 0 : height, entryOffset + 1); // Height (0 = 256)
    ico.writeUInt8(0, entryOffset + 2);      // Color palette
    ico.writeUInt8(0, entryOffset + 3);      // Reserved
    ico.writeUInt16LE(1, entryOffset + 4);   // Color planes
    ico.writeUInt16LE(32, entryOffset + 6);  // Bits per pixel
    ico.writeUInt32LE(png.length, entryOffset + 8);  // Image size
    ico.writeUInt32LE(offset, entryOffset + 12);     // Offset to image data

    // Copy PNG data
    png.copy(ico, offset);
  }

  return ico;
}

const icoBuffer = buildIco([png16, png32, png48]);
const icoPath = join(ROOT, 'app', 'favicon.ico');
writeFileSync(icoPath, icoBuffer);
console.log(`Generated ${icoPath} (ICO with 16x16, 32x32, 48x48)`);

console.log('\nDone! Static favicon files generated.');
