import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, rmSync } from 'node:fs';
import { buildDemo } from '../src/demo.js';
import { run } from '../src/run.js';
import { loadRules } from '../src/rules/index.js';
import { main } from '../src/cli.js';

test('demo app scores below 50 and trips at least 6 checks', async () => {
  const dir = buildDemo();
  try {
    const report = await run(dir);
    assert.ok(report.score < 50, `score ${report.score}`);
    assert.ok(new Set(report.results.map((r) => r.ruleId)).size >= 6);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('cli --demo scans the demo app', async () => {
  let stdout = '';
  const code = await main(['--demo', '--fail-on', 'never'], { cwd: process.cwd(), stdout: { write: (s) => { stdout += s; } }, stderr: { write() {} } });
  assert.equal(code, 0);
  assert.match(stdout, /Grade F|Grade D/);
  assert.match(stdout, /demo/i);
});

test('readme rule count matches the rules folder', async () => {
  const rules = await loadRules();
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  assert.match(readme, new RegExp(`${rules.length} checks`));
});

test('docs/rules.md lists every rule id', async () => {
  const doc = readFileSync(new URL('../docs/rules.md', import.meta.url), 'utf8');
  for (const r of await loadRules()) assert.ok(doc.includes(`\`${r.id}\``), r.id);
});

test('README check count matches the number of rules', async () => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  const match = readme.match(/(\d+) checks today/);
  assert.ok(match, 'README should say how many checks it runs today');
  const count = Number(match[1]);
  const rules = await loadRules();
  assert.equal(count, rules.length, 'README says ' + count + ' checks but there are ' + rules.length + ': update the count in README.md');
});
