/**
 * @fileoverview Main process file for the Naval Tactical Simulator
 * Handles application lifecycle, window management, and menu setup.
 * @module main
 */

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

/**
 * Creates the application menu with simulation controls
 * @function createAppMenu
 * @returns {Menu} The configured application menu
 */
function createAppMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Simulation',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            createNewSimulation();
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Simulation',
      submenu: [
        {
          label: 'Start',
          enabled: false, // Enable when simulation is loaded
          click: () => {
            startSimulation();
          }
        },
        {
          label: 'Pause',
          enabled: false,
          click: () => {
            pauseSimulation();
          }
        },
        {
          label: 'Reset',
          enabled: false,
          click: () => {
            resetSimulation();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  return menu;
}

/**
 * Creates a new simulation window
 * @function createNewSimulation
 */
function createNewSimulation() {
  const win = createWindow();
  win.webContents.send('new-simulation');
}

/**
 * Starts the current simulation
 * @function startSimulation
 */
function startSimulation() {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.webContents.send('start-simulation');
  }
}

/**
 * Pauses the current simulation
 * @function pauseSimulation
 */
function pauseSimulation() {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.webContents.send('pause-simulation');
  }
}

/**
 * Resets the current simulation
 * @function resetSimulation
 */
function resetSimulation() {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.webContents.send('reset-simulation');
  }
}


/**
 * Creates a new browser window
 * @function createWindow
 * @returns {BrowserWindow} The newly created window
 */
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  // Add window close handler
  win.on('close', () => {
    app.quit();
  });

  return win;
}

/**
 * Initializes the application
 * @function initializeApp
 */
function initializeApp() {
  app.whenReady().then(() => {
    createAppMenu();
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  // Remove the platform-specific check and always quit
  app.on('window-all-closed', () => {
    app.quit();
  });
}

initializeApp();

module.exports = {
  createWindow,
  createAppMenu,
  createNewSimulation,
  startSimulation,
  pauseSimulation,
  resetSimulation
}; 