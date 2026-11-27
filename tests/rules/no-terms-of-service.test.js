import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from '../../src/rules/no-terms-of-service.js';

const project = (files) => ({
  files: Object.keys(files),
  read: (f) => files[f] ?? '',
  lines: (f) => (files[f] ?? '').split('\n'),
  has: (re) => Object.keys(files).some((f) => re.test(f)),
});

test('no-terms-of-service does not flag a package.json with only react as a dependency', () => {
  assert.deepEqual(
    rule.check(project({
      'package.json': '{"dependencies":{"react":"^18.0.0"}}',
    })),
    [],
  );
});

test('no-terms-of-service does not flag a Stripe app whose footer links to a terms page', () => {
  assert.deepEqual(
    rule.check(project({
      'package.json': '{"dependencies":{"stripe":"^18.0.0"}}',
      'src/footer.tsx': '<a href="https://example.com/terms">Terms</a>',
    })),
    [],
  );
});

test('no-terms-of-service flags a Lemon Squeezy app with no terms page once', () => {
  const findings = rule.check(project({
    'package.json': '{"dependencies":{"@lemonsqueezy/lemonsqueezy.js":"^1.0.0"}}',
  }));
  assert.equal(findings.length, 1);
  assert.equal(findings[0].file, 'package.json');
});
