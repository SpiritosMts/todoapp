const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, globalShortcut, Notification, shell } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
let mainWindow = null;
let tray = null;
let isQuitting = false;

const DEFAULT_WINDOW_STATE = {
  width: 1440,
  height: 1140,
  x: undefined,
  y: undefined,
  isMaximized: false
};

function getWindowState() {
  return store.get('windowState', DEFAULT_WINDOW_STATE);
}

function saveWindowState() {
  if (!mainWindow) return;
  
  const bounds = mainWindow.getBounds();
  const isMaximized = mainWindow.isMaximized();
  
  store.set('windowState', {
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    isMaximized
  });
}

function createWindow() {
  const windowState = getWindowState();
  
  mainWindow = new BrowserWindow({
    width: windowState.width,
    height: windowState.height,
    x: windowState.x,
    y: windowState.y,
    minWidth: 1024,
    minHeight: 768,
    title: 'Desktop Task Aid',
    backgroundColor: '#f3f5f9',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false
    },
    show: false,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    icon: path.join(__dirname, '../assets/icon.png')
  });

  if (windowState.isMaximized) {
    mainWindow.maximize();
  }

  // Load the app
  mainWindow.loadFile(path.join(__dirname, '../web/index.html'));

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Save window state on resize/move
  mainWindow.on('resize', saveWindowState);
  mainWindow.on('move', saveWindowState);
  
  // Handle window close
  mainWindow.on('close', (event) => {
    if (!isQuitting && process.platform === 'darwin') {
      event.preventDefault();
      mainWindow.hide();
    } else {
      saveWindowState();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open external links in browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Development tools
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

function createTray() {
  const iconPath = process.platform === 'darwin' 
    ? path.join(__dirname, '../assets/tray-icon-mac.png')
    : path.join(__dirname, '../assets/tray-icon.png');
  
  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon.resize({ width: 16, height: 16 }));
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Desktop Task Aid',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          if (mainWindow.isMinimized()) mainWindow.restore();
          mainWindow.focus();
        } else {
          createWindow();
        }
      }
    },
    {
      label: 'Quick Add Task',
      accelerator: 'CommandOrControl+Shift+A',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
          mainWindow.webContents.send('trigger-quick-add');
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Start Timer',
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.send('trigger-timer-start');
        }
      }
    },
    {
      label: 'Pause Timer',
      click: () => {
        if (mainWindow) {
          mainWindow.webContents.send('trigger-timer-pause');
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Settings',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      accelerator: 'CommandOrControl+Q',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('Desktop Task Aid');
  
  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    } else {
      createWindow();
    }
  });
}

function registerGlobalShortcuts() {
  // Quick add task
  globalShortcut.register('CommandOrControl+Shift+A', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
      mainWindow.webContents.send('trigger-quick-add');
    }
  });

  // Toggle timer
  globalShortcut.register('CommandOrControl+Shift+T', () => {
    if (mainWindow) {
      mainWindow.webContents.send('trigger-timer-toggle');
    }
  });

  // Show/hide window
  globalShortcut.register('CommandOrControl+Shift+D', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });
}

function createApplicationMenu() {
  const template = [
    ...(process.platform === 'darwin' ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'New Task',
          accelerator: 'CommandOrControl+N',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('trigger-quick-add');
            }
          }
        },
        { type: 'separator' },
        process.platform === 'darwin' ? { role: 'close' } : { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Timer',
      submenu: [
        {
          label: 'Start/Pause Timer',
          accelerator: 'CommandOrControl+Shift+T',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('trigger-timer-toggle');
            }
          }
        },
        {
          label: 'Reset Timer',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('trigger-timer-reset');
            }
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(process.platform === 'darwin' ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://github.com');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC Handlers
ipcMain.handle('store-get', (event, key, defaultValue) => {
  return store.get(key, defaultValue);
});

ipcMain.handle('store-set', (event, key, value) => {
  store.set(key, value);
});

ipcMain.handle('store-delete', (event, key) => {
  store.delete(key);
});

ipcMain.handle('show-notification', (event, options) => {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title: options.title || 'Desktop Task Aid',
      body: options.body,
      icon: path.join(__dirname, '../assets/icon.png'),
      silent: options.silent || false
    });
    
    if (options.onClick) {
      notification.on('click', () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      });
    }
    
    notification.show();
  }
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-app-path', (event, name) => {
  return app.getPath(name);
});

// Listen for timer completion from renderer
ipcMain.on('timer-completed', () => {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title: 'Timer Completed!',
      body: 'Great job! Your focus session is complete.',
      icon: path.join(__dirname, '../assets/icon.png')
    });
    
    notification.on('click', () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
    
    notification.show();
  }
});

// App lifecycle
app.whenReady().then(() => {
  createWindow();
  createTray();
  createApplicationMenu();
  registerGlobalShortcuts();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  isQuitting = true;
  globalShortcut.unregisterAll();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Auto-launch configuration (optional)
if (!app.isPackaged) {
  app.setLoginItemSettings({
    openAtLogin: store.get('autoLaunch', false),
    openAsHidden: false
  });
}
