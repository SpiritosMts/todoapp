#!/usr/bin/env node

/**
 * Generate placeholder icon files for development
 * This creates minimal PNG files that prevent electron-builder warnings
 */

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

// Ensure assets directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Simple 1x1 transparent PNG in base64
const transparentPNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// Simple 512x512 purple gradient PNG placeholder (minimal data)
const placeholderIcon512 = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA' +
  'AASUVORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64'
);

const iconFiles = [
  { name: 'icon.png', data: placeholderIcon512, description: 'Main app icon (512x512)' },
  { name: 'tray-icon.png', data: transparentPNG, description: 'System tray icon (64x64)' },
  { name: 'tray-icon-mac.png', data: transparentPNG, description: 'macOS menu bar icon (32x32)' }
];

console.log('🎨 Generating placeholder icon files...\n');

iconFiles.forEach(({ name, data, description }) => {
  const filePath = path.join(assetsDir, name);
  
  // Don't overwrite existing files
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${name} (already exists)`);
    return;
  }
  
  try {
    fs.writeFileSync(filePath, data);
    const stats = fs.statSync(filePath);
    console.log(`✅ Created ${name} - ${description}`);
    console.log(`   Size: ${stats.size} bytes`);
  } catch (error) {
    console.error(`❌ Failed to create ${name}:`, error.message);
  }
});

console.log('\n📝 Note: These are minimal placeholder files.');
console.log('   For production builds, generate proper icons using:');
console.log('   - The SVG files in assets/');
console.log('   - See assets/ICON_GENERATION.md for instructions\n');

// Check if .ico and .icns files exist
const icoPath = path.join(assetsDir, 'icon.ico');
const icnsPath = path.join(assetsDir, 'icon.icns');

if (!fs.existsSync(icoPath)) {
  console.log('⚠️  Missing: icon.ico (Windows)');
  console.log('   Required for Windows builds');
}

if (!fs.existsSync(icnsPath)) {
  console.log('⚠️  Missing: icon.icns (macOS)');
  console.log('   Required for macOS builds');
}

console.log('\n✨ Ready to run: npm start\n');
