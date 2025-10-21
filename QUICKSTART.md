# Quick Start Guide

Get the Desktop Task Aid app running in 5 minutes!

## Prerequisites

Make sure you have Node.js installed:
```bash
node --version  # Should be 16.x or higher
npm --version   # Should be 7.x or higher
```

If not installed, download from [nodejs.org](https://nodejs.org/)

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

This will install:
- Electron (desktop framework)
- Electron Store (data persistence)
- Electron Builder (packaging tool)

### 2. Run the App
```bash
npm start
```

Or with developer tools open:
```bash
npm run dev
```

The app will launch in a new window!

## First Launch

When you first open the app, you'll see:
- 4 sample tasks already created
- A welcome message with an illustration
- Calendar view for the current month
- A Pomodoro timer set to 25:00

## Basic Usage

### Adding a Task
1. Click the **"Add Task"** button (top right)
2. Fill in:
   - Task name (required)
   - Due date (required)
   - Due time (required)
   - Reminder status (Active/Overdue/Not set)
3. Click **"Save Task"**

### Using the Timer
1. Click the **purple play button** to start
2. Click again to pause
3. Click the **reset button** to restart
4. Timer tracks your focus time daily

### Calendar Features
- Click any date to see tasks for that day
- Use arrows to navigate months
- Purple circle indicates today
- Dots show dates with tasks

### System Tray
- **macOS**: Look for icon in menu bar (top right)
- **Windows**: Look in system tray (bottom right)
- **Right-click** for quick actions:
  - Quick add task
  - Start/pause timer
  - Show/hide window
  - Quit app

### Keyboard Shortcuts

**Global (work everywhere):**
- `Cmd/Ctrl + Shift + A` - Quick add task
- `Cmd/Ctrl + Shift + T` - Toggle timer
- `Cmd/Ctrl + Shift + D` - Show/hide window

**In-app:**
- `Cmd/Ctrl + N` - New task
- `Cmd/Ctrl + Q` - Quit
- Search bar - Filter tasks in real-time

## Features Overview

✅ **Full Task Management**
- Create, edit, delete tasks
- Search and filter
- Pagination (10/25/50 per page)
- Color-coded reminders

✅ **Pomodoro Timer**
- 25-minute focus sessions
- Daily time tracking
- Desktop notifications

✅ **Calendar Integration**
- Month view with task visualization
- Daily task preview
- Date selection

✅ **Themes**
- Light mode (default)
- Dark mode toggle (sidebar)

✅ **Data Persistence**
- Auto-saves all changes
- Syncs across app restarts
- Stores locally on your computer

## Troubleshooting

### App Won't Start
```bash
# Clear dependencies and reinstall
rm -rf node_modules
npm install
npm start
```

### Missing Icons Warning
Icons are optional for development. The app will work fine with placeholder icons. To generate proper icons, see `assets/ICON_GENERATION.md`.

### Port Already in Use
Electron doesn't use ports - this shouldn't happen. If you see this error, another process might be interfering.

### Data Not Saving
Check that the app has write permissions:
- **macOS**: `~/Library/Application Support/desktop-task-aid/`
- **Windows**: `%APPDATA%\desktop-task-aid\`
- **Linux**: `~/.config/desktop-task-aid/`

## Next Steps

### Building for Distribution
```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Linux
npm run build:linux
```

Installers will be created in the `dist/` folder.

### Customization

**Change timer duration:**
Edit `web/script.js`:
```javascript
const DEFAULT_TIMER_SECONDS = 25 * 60; // Change 25 to your preferred minutes
```

**Change theme colors:**
Edit `web/styles.css` in the `:root` section.

**Modify window size:**
Edit `electron/main.js` in the `DEFAULT_WINDOW_STATE` object.

## Data Location

Your tasks and settings are stored at:
- **macOS**: `~/Library/Application Support/desktop-task-aid/`
- **Windows**: `%APPDATA%\desktop-task-aid\`
- **Linux**: `~/.config/desktop-task-aid/`

To backup your data, copy the `config.json` file from this location.

## Development Mode

Want to see what's happening under the hood?

```bash
npm run dev
```

This opens Developer Tools automatically. You can:
- Inspect elements
- View console logs
- Debug JavaScript
- Monitor network (if needed)

## Tips & Tricks

1. **Quick Access**: Keep the app in your system tray for instant access
2. **Keyboard First**: Use shortcuts for faster task management
3. **Timer Discipline**: Complete the full 25 minutes for best results
4. **Daily Review**: Check the calendar to plan your day
5. **Theme Switching**: Use dark mode in low-light environments

## Need Help?

- 📖 Full documentation: `README.md`
- 🐛 Found a bug? Open an issue on GitHub
- 💡 Feature request? Open an issue with the enhancement label
- 🎨 Icon generation: See `assets/ICON_GENERATION.md`

## What's Next?

Future features planned:
- Google Calendar sync
- Task categories and tags
- Time tracking analytics
- Export/import tasks
- Cloud backup (optional)

---

**Happy tasking! 🚀**

Start with small tasks, use the timer, and build momentum. You've got this!
