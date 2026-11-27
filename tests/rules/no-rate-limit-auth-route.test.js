import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from '../../src/rules/no-rate-limit-auth-route.js';

const project = (files) => ({
  files: Object.keys(files),
  read: (f) => files[f] ?? '',
  lines: (f) => (files[f] ?? '').split('\n'),
  has: (re) => Object.keys(files).some((f) => re.test(f)),
});

test('no-rate-limit-auth-route does not flag a POST login route when express-rate-limit is installed', () => {
  assert.deepEqual(
    rule.check(project({
      'package.json': '{"dependencies":{"express-rate-limit":"^7.0.0"}}',
      'server.js': "app.post('/login', h)",
    })),
    [],
  );
});

test('no-rate-limit-auth-route does not flag a GET login route', () => {
  assert.deepEqual(
    rule.check(project({
      'package.json': '{}',
      'server.js': "app.get('/login', h)",
    })),
    [],
  );
});

test('no-rate-limit-auth-route flags a POST register route once when package.json is empty', () => {
  const findings = rule.check(project({
    'package.json': '{}',
    'server.js': "router.post('/api/register', h)",
  }));
  assert.equal(findings.length, 1);
  assert.equal(findings[0].file, 'server.js');
});
