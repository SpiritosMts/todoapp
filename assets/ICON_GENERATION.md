# Icon Generation Instructions

The app requires icons in multiple formats for different platforms. Currently, SVG source files are provided.

## Required Formats

### Application Icons
- **icon.png** (512x512) - Linux, fallback
- **icon.icns** - macOS bundle icon
- **icon.ico** - Windows executable icon

### Tray Icons
- **tray-icon.png** (64x64) - Windows/Linux system tray
- **tray-icon-mac.png** (32x32 @2x) - macOS menu bar (Template image)

## Quick Generation

### Option 1: Using electron-icon-builder (Recommended)

```bash
npm install -g electron-icon-builder

# Generate all formats from SVG or PNG
electron-icon-builder --input=./assets/icon.svg --output=./assets
```

### Option 2: Using ImageMagick

```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt install imagemagick  # Linux

# Generate PNG from SVG
convert -background none -density 512 assets/icon.svg -resize 512x512 assets/icon.png

# Generate ICO for Windows (multiple sizes)
convert assets/icon.png -define icon:auto-resize=256,128,96,64,48,32,16 assets/icon.ico

# Generate tray icons
convert -background none -density 64 assets/tray-icon.svg -resize 64x64 assets/tray-icon.png
convert -background none -density 32 assets/tray-icon.svg -resize 32x32 assets/tray-icon-mac.png
```

### Option 3: Using Figma/Design Tool

1. Export from Figma:
   - Main icon: 512x512 PNG
   - Tray icon: 64x64 PNG
   
2. Convert to platform formats:
   - **macOS (.icns)**:
     ```bash
     mkdir icon.iconset
     sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
     sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
     sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
     sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
     sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
     sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
     sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
     sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
     sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
     cp icon.png icon.iconset/icon_512x512@2x.png
     iconutil -c icns icon.iconset
     rm -rf icon.iconset
     ```
   
   - **Windows (.ico)**: Use online converter or ImageMagick
   
## Icon Design Guidelines

### Application Icon
- **Size**: 512x512px minimum
- **Format**: Square with optional rounded corners
- **Colors**: Purple gradient (#CB3CFF to #A855F7)
- **Elements**: Checklist/task symbol
- **Background**: Solid or gradient, no transparency at edges

### Tray Icon
- **Size**: 64x64px (will be scaled to 16-32px)
- **Style**: Simple, high contrast, recognizable at small sizes
- **Colors**: Monochrome or simple color scheme
- **macOS**: Use template image (black/transparent, name with "Template")

## Placeholder Icons

Until proper icons are generated, the app will use:
1. SVG icons (provided)
2. Electron's default icon
3. System fallback icons

To build the app with proper icons, generate them before running build commands.

## Testing Icons

### Test in Development
```bash
npm start
# Check menu bar, taskbar, dock, and window
```

### Test Tray Icon
- **macOS**: Should appear in menu bar (top right)
- **Windows**: Should appear in system tray (bottom right)
- **Linux**: Depends on desktop environment

## Resources

- [Electron Builder Icons](https://www.electron.build/icons)
- [macOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/app-icon/)
- [Windows App Icon Design](https://docs.microsoft.com/en-us/windows/apps/design/style/iconography/app-icon-construction)
- [Icon Generators](https://www.electron.build/icons#automatic-icon-generation)

## Notes

- The build process will warn about missing icons but still create functional packages
- Icons can be updated after building by replacing files in the packaged app
- For production, use high-quality PNG/SVG sources at recommended sizes
