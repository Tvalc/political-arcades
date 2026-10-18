import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import test from 'node:test';

test('Housing Stack inline startup scripts parse before the browser runs them', () => {
  const html = readFileSync(new URL('../housing-stack/index.html', import.meta.url), 'utf8');
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, attributes, source]) => !/\bsrc\s*=|application\/ld\+json/i.test(attributes) && source.trim());
  assert.ok(scripts.length, 'The production page must have an inline startup script');
  for (const [, attributes, source] of scripts) {
    const type = /type\s*=\s*["']module["']/i.test(attributes) ? 'module' : 'commonjs';
    const result = spawnSync(process.execPath, ['--check', `--input-type=${type}`], {
      input: source, encoding: 'utf8'
    });
    assert.equal(result.status, 0, result.stderr);
  }
});
