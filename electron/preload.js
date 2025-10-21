const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Store API
  store: {
    get: (key, defaultValue) => ipcRenderer.invoke('store-get', key, defaultValue),
    set: (key, value) => ipcRenderer.invoke('store-set', key, value),
    delete: (key) => ipcRenderer.invoke('store-delete', key)
  },
  
  // Notification API
  showNotification: (options) => ipcRenderer.invoke('show-notification', options),
  
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppPath: (name) => ipcRenderer.invoke('get-app-path', name),
  
  // Timer events to main process
  timerCompleted: () => ipcRenderer.send('timer-completed'),
  
  // Listen to events from main process
  on: (channel, callback) => {
    const validChannels = [
      'trigger-quick-add',
      'trigger-timer-start',
      'trigger-timer-pause',
      'trigger-timer-toggle',
      'trigger-timer-reset'
    ];
    
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
  },
  
  // Remove listeners
  removeListener: (channel, callback) => {
    ipcRenderer.removeListener(channel, callback);
  },
  
  // Platform info
  platform: process.platform,
  isElectron: true
});

// Inject flag to detect Electron environment
contextBridge.exposeInMainWorld('isElectron', true);
