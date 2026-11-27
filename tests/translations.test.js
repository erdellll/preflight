import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));

test('every translation in docs/ is linked from the language line in README.md', () => {
  const translations = readdirSync(root('docs')).filter((name) => /^README\..+\.md$/.test(name));
  assert.ok(translations.length > 0, 'expected at least one translation in docs/');
  const readme = readFileSync(root('README.md'), 'utf8');
  for (const file of translations) {
    assert.ok(
      readme.includes(`(docs/${file})`),
      `docs/${file} is not linked from the language line in README.md`,
    );
  }
});
