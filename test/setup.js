/**
 * @fileoverview Test setup configuration for the Electron TDD Project
 * This file provides mock implementations of Electron modules for testing.
 * @module test/setup
 */

const mockState = {
  windowAllClosedCallback: null,
  activateCallback: null,
  readyPromise: null,
  readyResolver: null
};

// Export mock state for test access
module.exports = mockState;

/**
 * Mock implementation of Electron modules
 * @namespace
 */
jest.mock('electron', () => {
  const mockBrowserWindow = {
    loadFile: jest.fn(),
    webContents: {
      openDevTools: jest.fn(),
    },
    on: jest.fn(),
    show: jest.fn(),
  };

  return {
    app: {
      whenReady: jest.fn().mockReturnValue(mockState.readyPromise),
      on: jest.fn((event, callback) => {
        if (event === 'window-all-closed') {
          mockState.windowAllClosedCallback = callback;
        }
        if (event === 'activate') {
          mockState.activateCallback = callback;
        }
      }),
      quit: jest.fn()
    },
    BrowserWindow: jest.fn(() => mockBrowserWindow),
    ipcMain: {
      on: jest.fn(),
      handle: jest.fn(),
    },
    ipcRenderer: {
      on: jest.fn(),
      send: jest.fn(),
      invoke: jest.fn(),
    }
  };
}); 