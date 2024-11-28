/**
 * @fileoverview Test setup configuration for the Electron TDD Project
 * This file provides mock implementations of Electron modules for testing.
 * @module test/setup
 */

/**
 * @typedef {Object} MockState
 * @property {Function|null} windowAllClosedCallback - Callback for window-all-closed event
 * @property {Function|null} activateCallback - Callback for activate event
 * @property {Promise|null} readyPromise - Promise for app ready state
 * @property {Function|null} readyResolver - Resolver function for readyPromise
 */

/**
 * Shared mock state for test synchronization
 * @type {MockState}
 */
const mockState = {
  windowAllClosedCallback: null,
  activateCallback: null,
  readyPromise: null,
  readyResolver: null
};

/**
 * Mock implementation of BrowserWindow
 * @class MockBrowserWindow
 */
const mockBrowserWindow = {
  loadFile: jest.fn(),
  webContents: {
    openDevTools: jest.fn(),
  },
  on: jest.fn(),
  show: jest.fn(),
};

// Export mock state for test access
module.exports = mockState;

/**
 * Mock implementation of Electron modules
 * @namespace
 */
jest.mock('electron', () => ({
  app: {
    whenReady: jest.fn().mockReturnValue(mockState.readyPromise),
    on: jest.fn(),
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
})); 