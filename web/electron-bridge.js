// Electron integration bridge
// This module detects if running in Electron and provides unified storage/notification APIs

const isElectron = typeof window !== 'undefined' && window.electron && window.electron.isElectron;

// Storage adapter - uses Electron Store if available, otherwise localStorage
const storage = {
  async get(key, defaultValue) {
    if (isElectron) {
      return await window.electron.store.get(key, defaultValue);
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  async set(key, value) {
    if (isElectron) {
      return await window.electron.store.set(key, value);
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  async delete(key) {
    if (isElectron) {
      return await window.electron.store.delete(key);
    }
    localStorage.removeItem(key);
  }
};

// Notification adapter
const notifications = {
  async show(options) {
    if (isElectron) {
      return await window.electron.showNotification(options);
    }
    // Fallback to browser notifications
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(options.title || 'Desktop Task Aid', {
        body: options.body,
        icon: options.icon
      });
    }
  },

  async requestPermission() {
    if (!isElectron && 'Notification' in window) {
      return await Notification.requestPermission();
    }
    return 'granted';
  }
};

// Setup Electron event listeners
function setupElectronListeners() {
  if (!isElectron) return;

  // Quick add task shortcut
  window.electron.on('trigger-quick-add', () => {
    const event = new CustomEvent('electron-quick-add');
    window.dispatchEvent(event);
  });

  // Timer controls
  window.electron.on('trigger-timer-start', () => {
    const event = new CustomEvent('electron-timer-start');
    window.dispatchEvent(event);
  });

  window.electron.on('trigger-timer-pause', () => {
    const event = new CustomEvent('electron-timer-pause');
    window.dispatchEvent(event);
  });

  window.electron.on('trigger-timer-toggle', () => {
    const event = new CustomEvent('electron-timer-toggle');
    window.dispatchEvent(event);
  });

  window.electron.on('trigger-timer-reset', () => {
    const event = new CustomEvent('electron-timer-reset');
    window.dispatchEvent(event);
  });
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupElectronListeners);
} else {
  setupElectronListeners();
}

// Export the adapters
window.taskAidStorage = storage;
window.taskAidNotifications = notifications;
window.taskAidIsElectron = isElectron;

// Send timer completion to Electron
window.notifyTimerCompleted = function() {
  if (isElectron && window.electron.timerCompleted) {
    window.electron.timerCompleted();
  }
};
