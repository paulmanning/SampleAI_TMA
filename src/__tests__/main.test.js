/**
 * @fileoverview Test suite for the Naval Tactical Simulator
 * Contains tests for simulation control and TMA functionality
 * @module main.test
 */

const mockState = require('../../test/setup');
const { app, BrowserWindow, Menu } = require('electron');

/**
 * Main Process Test Suite
 * Tests the core functionality of the Naval Tactical Simulator
 * @namespace MainProcessTests
 */
describe('Main Process', () => {
  let main;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    
    mockState.windowAllClosedCallback = null;
    mockState.activateCallback = null;
    
    mockState.readyPromise = new Promise(resolve => {
      mockState.readyResolver = resolve;
    });
    
    app.whenReady.mockReturnValue(mockState.readyPromise);
    
    main = require('../main');
  });

  describe('Simulation Control', () => {
    it('should create new simulation', () => {
      const mockWindow = {
        webContents: {
          send: jest.fn()
        }
      };
      BrowserWindow.getFocusedWindow.mockReturnValue(mockWindow);
      
      main.createNewSimulation();
      expect(mockWindow.webContents.send).toHaveBeenCalledWith('new-simulation');
    });

    it('should start simulation', () => {
      const mockWindow = {
        webContents: {
          send: jest.fn()
        }
      };
      BrowserWindow.getFocusedWindow.mockReturnValue(mockWindow);
      
      main.startSimulation();
      expect(mockWindow.webContents.send).toHaveBeenCalledWith('start-simulation');
    });

    it('should pause simulation', () => {
      const mockWindow = {
        webContents: {
          send: jest.fn()
        }
      };
      BrowserWindow.getFocusedWindow.mockReturnValue(mockWindow);
      
      main.pauseSimulation();
      expect(mockWindow.webContents.send).toHaveBeenCalledWith('pause-simulation');
    });

    it('should reset simulation', () => {
      const mockWindow = {
        webContents: {
          send: jest.fn()
        }
      };
      BrowserWindow.getFocusedWindow.mockReturnValue(mockWindow);
      
      main.resetSimulation();
      expect(mockWindow.webContents.send).toHaveBeenCalledWith('reset-simulation');
    });
  });

  describe('Menu System', () => {
    it('should create application menu with simulation controls', () => {
      // Mock Menu.buildFromTemplate and setApplicationMenu
      const mockMenu = {};
      Menu.buildFromTemplate = jest.fn().mockReturnValue(mockMenu);
      Menu.setApplicationMenu = jest.fn();

      const menu = main.createAppMenu();
      
      expect(Menu.buildFromTemplate).toHaveBeenCalled();
      expect(Menu.setApplicationMenu).toHaveBeenCalledWith(mockMenu);
      expect(menu).toBe(mockMenu);

      // Verify menu template structure
      const template = Menu.buildFromTemplate.mock.calls[0][0];
      expect(template).toHaveLength(3); // File, Simulation, View menus
      expect(template[0].label).toBe('File');
      expect(template[1].label).toBe('Simulation');
      expect(template[2].label).toBe('View');

      // Verify File menu items
      expect(template[0].submenu).toContainEqual(
        expect.objectContaining({
          label: 'New Simulation',
          accelerator: 'CmdOrCtrl+N'
        })
      );

      // Verify Simulation menu items
      expect(template[1].submenu).toContainEqual(
        expect.objectContaining({
          label: 'Start',
          enabled: false
        })
      );
      expect(template[1].submenu).toContainEqual(
        expect.objectContaining({
          label: 'Pause',
          enabled: false
        })
      );
      expect(template[1].submenu).toContainEqual(
        expect.objectContaining({
          label: 'Reset',
          enabled: false
        })
      );
    });
  });
}); 