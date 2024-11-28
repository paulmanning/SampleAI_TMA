/**
 * @fileoverview Main process file for the Electron TDD Project
 * This file handles the core application lifecycle, window management,
 * and IPC communication setup.
 * @module main
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

/**
 * Creates a new browser window for the application.
 * This function initializes the main application window with specific
 * dimensions and web preferences.
 * 
 * @function createWindow
 * @returns {BrowserWindow} A new instance of Electron's BrowserWindow
 * @example
 * const mainWindow = createWindow();
 */
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      /**
       * Enable Node.js integration in the renderer process
       * @type {boolean}
       */
      nodeIntegration: true,
      /**
       * Disable context isolation for this example
       * @type {boolean}
       */
      contextIsolation: false
    }
  });

  // Load the index.html file
  win.loadFile(path.join(__dirname, 'index.html'));
  return win;
}

/**
 * Initializes the application and sets up event handlers.
 * This function manages the application lifecycle including:
 * - Window creation
 * - Application activation handling
 * - Window closure handling
 * 
 * @function initializeApp
 * @returns {void}
 */
function initializeApp() {
  // When Electron has finished initialization
  app.whenReady().then(() => {
    createWindow();

    // On macOS it's common to re-create a window when
    // clicking the dock icon if there aren't any other windows open
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  // Handle window-all-closed event
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

// Initialize the application
initializeApp();

module.exports = {
  createWindow
}; 