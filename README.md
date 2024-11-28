# Naval Tactical Simulator Documentation

This documentation is automatically generated from the source code using JSDoc.

## Project Structure

### Main Process (`src/main.js`)
The main process handles:
- Application lifecycle management
- Simulation window management
- Menu and control systems
- IPC communication for simulation events

### Simulation Components
The application consists of several key components:

#### Target Motion Analysis
- Vessel tracking
- Motion prediction
- Sensor data processing
- Solution generation

#### Tactical Display
- Real-time visualization
- Track management
- Sensor coverage display
- Solution visualization

### Test Files (`src/__tests__/`)
Contains test suites that verify:
- Application initialization
- Simulation management
- TMA calculations
- Event handling
- IPC communication

### Test Setup (`test/`)
Provides:
- Mock implementations of Electron modules
- Simulation state mocking
- Test utilities and helpers

## Getting Started

### Running the Application
```bash
npm start
```

### Development Mode
```bash
npm run dev
```

### Running Tests
```bash
npm test
```

### Generating Documentation
```bash
npm run docs
```

## Development Guidelines

### Test-Driven Development
1. Write tests first
2. Implement features
3. Refactor code
4. Repeat

### Documentation
- Use JSDoc comments for all public functions
- Keep documentation up-to-date with code changes
- Run documentation generation before commits
