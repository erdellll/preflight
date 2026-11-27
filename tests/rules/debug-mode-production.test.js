import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from '../../src/rules/debug-mode-production.js';

const project = (files) => ({
  files: Object.keys(files),
  read: (f) => files[f] ?? '',
  lines: (f) => (files[f] ?? '').split('\n'),
  has: (re) => Object.keys(files).some((f) => re.test(f)),
});

test('debug-mode-production does not flag DEBUG read from the environment in settings.py', () => {
  assert.deepEqual(
    rule.check(project({
      'settings.py': 'DEBUG = os.environ.get("DEBUG") == "1"',
    })),
    [],
  );
});

test('debug-mode-production does not flag DEBUG = True in tests/settings.py', () => {
  assert.deepEqual(
    rule.check(project({
      'tests/settings.py': 'DEBUG = True',
    })),
    [],
  );
});

test('debug-mode-production flags app.run with debug=True in app.py once', () => {
  const findings = rule.check(project({
    'app.py': 'app.run(host="0.0.0.0", debug=True)',
  }));
  assert.equal(findings.length, 1);
  assert.equal(findings[0].file, 'app.py');
});
