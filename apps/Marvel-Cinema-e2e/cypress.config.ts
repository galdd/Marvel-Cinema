import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run Marvel-Cinema:serve',
        production: 'nx run Marvel-Cinema:preview',
      },
      ciWebServerCommand: 'nx run Marvel-Cinema:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
