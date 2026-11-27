import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from '../../src/rules/open-redirect.js';

const project = (files) => ({
  files: Object.keys(files),
  read: (f) => files[f] ?? '',
  lines: (f) => (files[f] ?? '').split('\n'),
  has: (re) => Object.keys(files).some((f) => re.test(f)),
});

test('does not flag a redirect to a fixed path', () => {
  assert.deepEqual(
    rule.check(project({ 'src/server.js': "res.redirect('/home');" })),
    [],
  );
});

test('does not flag a commented-out redirect', () => {
  assert.deepEqual(
    rule.check(
      project({ 'src/server.js': '// res.redirect(req.query.next);' }),
    ),
    [],
  );
});

test('flags a redirect to req.body.next once', () => {
  const findings = rule.check(
    project({ 'src/server.js': 'res.redirect(req.body.next);' }),
  );
  assert.equal(findings.length, 1);
  assert.equal(findings[0].file, 'src/server.js');
});
