# Naval Tactical Simulator

[![CI](https://github.com/paulmanning/SampleAI_TMA/actions/workflows/ci.yml/badge.svg)](https://github.com/paulmanning/SampleAI_TMA/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/paulmanning/SampleAI_TMA/branch/main/graph/badge.svg)](https://codecov.io/gh/paulmanning/SampleAI_TMA)
[![Documentation](https://img.shields.io/badge/docs-gh--pages-blue.svg)](https://paulmanning.github.io/SampleAI_TMA/)

An Electron-based naval tactical simulator with target motion analysis capabilities.

## Features

- Target Motion Analysis (TMA)
- Naval tactical simulation
- Real-time visualization
- Scenario management
- Test-Driven Development approach

## Overview
This application simulates naval tactical scenarios with a focus on target motion analysis. Built using Electron and modern JavaScript, it provides a robust platform for tactical simulations.

## Prerequisites
- Node.js (LTS version)
- npm or yarn
- Git

## Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/paulmanning/SampleAI_TMA.git
   cd SampleAI_TMA
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Testing
This project follows TDD principles. All features are developed using the following workflow:
1. Write a failing test
2. Write minimal code to make the test pass
3. Refactor while keeping tests green

## Scripts
- `npm run dev`: Start development server
- `npm test`: Run test suite
- `npm run build`: Build production version
- `npm run lint`: Run linter
- `npm run format`: Format code
- `npm run docs`: Generate documentation

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details 