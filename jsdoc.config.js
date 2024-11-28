/**
 * @fileoverview JSDoc configuration file for the Electron TDD Project
 * Configures documentation generation settings and theme options.
 * @module jsdoc.config
 */

module.exports = {
    source: {
        /**
         * Source files to include in documentation
         * @type {string[]}
         */
        include: ['./src'],
        
        /**
         * Files to exclude from documentation
         * @type {string[]}
         */
        exclude: ['./src/__tests__'],
        
        /**
         * Pattern for including files
         * @type {string}
         */
        includePattern: '.+\\.js$',
    },
    opts: {
        destination: './docs',
        recurse: true,
        template: 'node_modules/clean-jsdoc-theme',
    },
    plugins: ['plugins/markdown'],
    templates: {
        cleverLinks: true,
        monospaceLinks: true,
        default: {
            outputSourceFiles: true,
        },
        'clean-jsdoc-theme': {
            name: 'Electron TDD Project',
            navigation: [
                {
                    label: 'Github',
                    href: 'https://github.com/paulmanning/SampleAI_TMA'
                }
            ],
            footer: 'Documentation generated with JSDoc',
            dark_mode: true,
            base_url: './'
        }
    }
}; 