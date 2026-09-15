import { defineConfig } from '@playwright/test';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// spec2test/playwright.config.ts -> repo root. __dirname, not
// import.meta.url: Playwright loads this config as CommonJS whenever the
// target repo's own package.json has no "type": "module" (Conduit's
// doesn't), and import.meta.url throws under CJS. Manual .env parse, same
// pattern service/test/jira.test.ts uses - no dotenv dependency needed.
const repoRoot = join(__dirname, '..');
const envPath = join(repoRoot, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

export default defineConfig({
  testDir: './generated',
  timeout: 30_000,
  use: {
    baseURL: process.env.CONDUIT_BASE_URL,
  },
});
