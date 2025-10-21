# Desktop Task Aid - Electron App

A modern, cross-platform task management and productivity desktop application built with Electron.

![Desktop Task Aid](assets/screenshot.png)

## 🌟 Features

### Core Features
- ✅ **Task Management**: Full CRUD operations with persistent storage
- 📅 **Calendar Integration**: Month view with task visualization
- ⏱️ **Pomodoro Timer**: 25-minute focus sessions with daily tracking
- 🔔 **Native Notifications**: Desktop notifications for timer completion
- 🌓 **Theme Support**: Light and dark modes
- 💾 **Auto-Save**: Automatic state persistence using Electron Store

### Desktop-Specific Features
- 🖥️ **System Tray**: Quick access from menu bar/system tray
- ⌨️ **Global Shortcuts**:
  - `Cmd/Ctrl + Shift + A`: Quick add task
  - `Cmd/Ctrl + Shift + T`: Toggle timer
  - `Cmd/Ctrl + Shift + D`: Show/hide window
- 🪟 **Window State Persistence**: Remembers size, position, and maximized state
- 🚀 **Cross-Platform**: Windows, macOS, and Linux support
- 📦 **Offline First**: All data stored locally, works without internet

## 📋 Requirements

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher

## 🚀 Installation

1. **Clone or download this repository**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the app in development mode**:
   ```bash
   npm start
   # or with dev tools open:
   npm run dev
   ```

## 🛠️ Development

### Project Structure

```
todoapp/
├── electron/              # Electron main process files
│   ├── main.js           # Main process entry point
│   └── preload.js        # Preload script for secure IPC
├── web/                  # Web application files
│   ├── index.html        # Main HTML
│   ├── styles.css        # Stylesheets
│   ├── script.js         # Main application logic
│   └── electron-bridge.js # Electron integration bridge
├── assets/               # Icons and images
│   ├── icon.png          # App icon (Linux)
│   ├── icon.icns         # App icon (macOS)
│   ├── icon.ico          # App icon (Windows)
│   ├── tray-icon.png     # System tray icon
│   └── tray-icon-mac.png # macOS menu bar icon
├── package.json          # Package configuration
└── README.md            # This file
```

### Available Scripts

- `npm start` - Run the app in production mode
- `npm run dev` - Run with DevTools open
- `npm run build:mac` - Build for macOS (DMG, ZIP)
- `npm run build:win` - Build for Windows (NSIS installer, portable)
- `npm run build:linux` - Build for Linux (AppImage, DEB)
- `npm run pack` - Package without creating installers
- `npm run dist` - Build for current platform

## 📦 Building for Distribution

### macOS
```bash
npm run build:mac
```
Outputs:
- `dist/Desktop Task Aid-1.0.0.dmg`
- `dist/Desktop Task Aid-1.0.0-mac.zip`

### Windows
```bash
npm run build:win
```
Outputs:
- `dist/Desktop Task Aid Setup 1.0.0.exe` (installer)
- `dist/Desktop Task Aid 1.0.0.exe` (portable)

### Linux
```bash
npm run build:linux
```
Outputs:
- `dist/Desktop Task Aid-1.0.0.AppImage`
- `dist/desktop-task-aid_1.0.0_amd64.deb`

## ⌨️ Keyboard Shortcuts

### Global Shortcuts (work anywhere)
- **Cmd/Ctrl + Shift + A**: Quick add new task
- **Cmd/Ctrl + Shift + T**: Start/pause timer
- **Cmd/Ctrl + Shift + D**: Show/hide application window

### In-App Shortcuts
- **Cmd/Ctrl + N**: New task
- **Cmd/Ctrl + Q**: Quit application
- **Cmd/Ctrl + R**: Reload
- **Cmd/Ctrl + Option/Alt + I**: Toggle Developer Tools

## 🎨 Design System

The app follows the design specifications from the Figma file:

### Colors
- **Primary**: `#A855F7` (Purple)
- **Accent**: `#CB3CFF` (Purple Light)
- **Background**: `#F3F5F9` (Light Gray)
- **Surface**: `#FFFFFF` (White)
- **Text Primary**: `#151B26` (Dark)
- **Text Secondary**: `#6F7782` (Gray)

### Typography
- **Headings**: Mulish (Semi-Bold, Bold)
- **Body**: Mulish, DM Sans (Regular, Medium)
- **UI Text**: Mona Sans (Medium)

## 🔔 Notification Permissions

The app uses native desktop notifications:
- **macOS**: Automatically granted for packaged apps
- **Windows**: No permission needed
- **Linux**: Depends on desktop environment

## 💾 Data Storage

All data is stored locally using Electron Store:
- **macOS**: `~/Library/Application Support/desktop-task-aid/`
- **Windows**: `%APPDATA%\desktop-task-aid\`
- **Linux**: `~/.config/desktop-task-aid/`

Storage includes:
- Tasks and reminders
- Calendar data
- Timer settings and daily progress
- Theme preference
- Window state

## 🐛 Troubleshooting

### App won't start
1. Delete the config folder (see Data Storage locations above)
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Try running with `npm run dev` to see errors

### Keyboard shortcuts not working
- Make sure no other app is using the same shortcuts
- On macOS, check System Preferences > Security & Privacy > Accessibility
- Restart the application

### Tray icon not showing
- **Windows**: Check if hidden in overflow area
- **macOS**: Menu bar might be full
- **Linux**: System tray support varies by DE

## 🔒 Security

- **Context Isolation**: Enabled for security
- **Node Integration**: Disabled in renderer
- **Secure IPC**: All communication through preload script
- **No Remote Module**: Disabled for security

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🆘 Support

For issues, questions, or feature requests, please open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Google Calendar API integration
- [ ] Task categories and tags
- [ ] Time tracking analytics
- [ ] Export/import functionality
- [ ] Cloud sync (optional)
- [ ] Collaboration features
- [ ] Mobile companion app
- [ ] Custom themes

## 🙏 Acknowledgments

- Design inspired by modern productivity apps
- Built with Electron
- Icons from Figma design system

---

**Made with ❤️ for productivity enthusiasts**
