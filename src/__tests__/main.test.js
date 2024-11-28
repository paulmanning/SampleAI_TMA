/**
 * @fileoverview Test suite for the main process of Electron TDD Project
 * Contains comprehensive tests for application lifecycle and window management.
 * @module main.test
 */

const mockState = require('../../test/setup');
const { app, BrowserWindow } = require('electron');

/**
 * Main Process Test Suite
 * Tests the core functionality of the Electron application's main process
 * @namespace MainProcessTests
 */
describe('Main Process', () => {
  let main;

  /**
   * Test setup before each test
   * Resets modules, mocks, and creates fresh instances
   * @memberof MainProcessTests
   */
  beforeEach(() => {
    // Clear module cache to ensure fresh require
    jest.resetModules();
    
    // Clear all mocks
    jest.clearAllMocks();
    
    // Reset stored callbacks
    mockState.windowAllClosedCallback = null;
    mockState.activateCallback = null;
    
    // Create new ready promise
    mockState.readyPromise = new Promise(resolve => {
      mockState.readyResolver = resolve;
    });
    
    // Update the whenReady mock
    app.whenReady.mockReturnValue(mockState.readyPromise);

    // Import main after setting up mocks
    main = require('../main');
  });

  /**
   * Tests for proper initialization
   * @memberof MainProcessTests
   */
  it('should initialize properly', () => {
    expect(app.whenReady).toHaveBeenCalled();
  });

  it('should create a browser window', async () => {
    // Resolve the ready promise
    await mockState.readyPromise;
    
    expect(BrowserWindow).toHaveBeenCalledWith({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
  });

  it('should quit on window-all-closed for non-darwin platforms', () => {
    // Mock platform as Windows
    const originalPlatform = process.platform;
    Object.defineProperty(process, 'platform', {
      value: 'win32',
      configurable: true
    });
    
    expect(mockState.windowAllClosedCallback).toBeDefined();
    mockState.windowAllClosedCallback();
    
    expect(app.quit).toHaveBeenCalled();

    // Restore original platform
    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
      configurable: true
    });
  });

  it('should not quit on window-all-closed for darwin platform', () => {
    // Mock platform as macOS
    const originalPlatform = process.platform;
    Object.defineProperty(process, 'platform', {
      value: 'darwin',
      configurable: true
    });
    
    expect(mockState.windowAllClosedCallback).toBeDefined();
    mockState.windowAllClosedCallback();
    
    expect(app.quit).not.toHaveBeenCalled();

    // Restore original platform
    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
      configurable: true
    });
  });

  it('should create new window on activate if no windows exist', async () => {
    // Resolve the ready promise first
    await mockState.readyPromise;
    
    // Clear the BrowserWindow mock calls from initial window creation
    BrowserWindow.mockClear();
    
    expect(mockState.activateCallback).toBeDefined();
    
    // Mock that no windows exist
    BrowserWindow.getAllWindows.mockReturnValue([]);
    
    mockState.activateCallback();
    expect(BrowserWindow).toHaveBeenCalled();
  });

  describe('createWindow', () => {
    it('should create window with correct options', () => {
      const win = main.createWindow();
      
      expect(win).toBeDefined();
      expect(win.webContents).toBeDefined();
      
      expect(BrowserWindow).toHaveBeenCalledWith({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      });
    });

    it('should load correct HTML file', () => {
      const win = main.createWindow();
      expect(win.loadFile).toHaveBeenCalledWith(
        expect.stringMatching(/index\.html$/)
      );
    });
  });

  describe('app ready handler', () => {
    it('should handle ready event properly', async () => {
      await mockState.readyPromise;
      expect(BrowserWindow).toHaveBeenCalled();
    });
  });
}); 