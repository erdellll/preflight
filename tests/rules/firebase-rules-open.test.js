import { test } from 'node:test';
import assert from 'node:assert/strict';
import rule from '../../src/rules/firebase-rules-open.js';

const project = (files) => ({
  files: Object.keys(files),
  read: (f) => files[f] ?? '',
  lines: (f) => (files[f] ?? '').split('\n'),
  has: (re) => Object.keys(files).some((f) => re.test(f)),
});

test('firebase-rules-open is quiet for authenticated read rules', () => {
  assert.deepEqual(
    rule.check(project({ 'firestore.rules': 'allow read: if request.auth != null;' })),
    [],
  );
});

test('firebase-rules-open is quiet for a commented-out open rule', () => {
  assert.deepEqual(
    rule.check(project({ 'firestore.rules': '// allow read, write: if true;' })),
    [],
  );
});

test('firebase-rules-open flags an open write rule once', () => {
  const findings = rule.check(project({ 'firestore.rules': 'allow write: if true;' }));
  assert.equal(findings.length, 1);
  assert.equal(findings[0].file, 'firestore.rules');
  assert.equal(findings[0].line, 1);
});
