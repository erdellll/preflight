import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from '../../src/rules/localhost-url-in-prod-config.js';

const project = (files) => ({
  files: Object.keys(files),
  read: (f) => files[f] ?? '',
  lines: (f) => (files[f] ?? '').split('\n'),
  has: (re) => Object.keys(files).some((f) => re.test(f)),
});

test('does not flag a localhost URL in src/__tests__/api.ts', () => {
  assert.deepEqual(
    rule.check(
      project({
        'src/__tests__/api.ts': "const API = 'http://localhost:3000';",
      }),
    ),
    [],
  );
});

test('does not flag a commented localhost URL in .env.production', () => {
  assert.deepEqual(
    rule.check(project({ '.env.production': '# API=http://localhost:3000' })),
    [],
  );
});

test('flags a localhost URL in .env.production once', () => {
  const findings = rule.check(
    project({ '.env.production': 'API=http://localhost:3000' }),
  );
  assert.equal(findings.length, 1);
  assert.equal(findings[0].file, '.env.production');
});
