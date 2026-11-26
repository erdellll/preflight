const CODE = /\.(?:js|jsx|mjs|cjs|ts|tsx|py|rb|go|php|java|kt|cs)$/;
/**
 * The start of a `jwt.sign` or `jwt.verify` call. Finding the call first and then walking its
 * arguments is what makes a nested object, an array or a call as the first argument work; a single
 * pattern trying to describe "everything up to the second comma" gets them wrong (the first version
 * of this rule missed `jwt.sign([a, b], 'x')`).
 */
const JWT_CALL = /\bjwt\s*\.\s*(?:sign|verify)\s*\(/g;
/**
 * The arguments of the call that starts at `open` (the index just past its `(`), as text with
 * surrounding spaces removed. Brackets inside strings are not counted, so a secret holding `(` does
 * not confuse the walk.
 */
function callArguments(text, open) {
  const args = [];
  let current = '';
  let depth = 0;
  let quote = null;
  for (let i = open; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      current += ch;
      if (ch === '\\') {
        current += text[++i] ?? '';
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      current += ch;
      continue;
    }
    if (ch === '(' || ch === '[' || ch === '{') depth += 1;
    if (ch === ')' || ch === ']' || ch === '}') {
      if (depth === 0) {
        args.push(current.trim());
        return args;
      }
      depth -= 1;
    }
    if (ch === ',' && depth === 0) {
      args.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  args.push(current.trim());
  return args;
}

/** The text of a string literal argument, or null when the argument is not one. */
function literalValue(argument) {
  const match = /^(['"`])((?:\\.|(?!\1)[^\\])*)\1$/.exec(argument);
  return match ? match[2] : null;
}

/** A hard-coded secret has to be long enough to resist guessing; 32 bytes is the HS256 minimum. */
const MIN_SECRET_LENGTH = 32;
/** Examples people copy without changing; weak however long. */
const PLACEHOLDER = /^(?:secret|changeme|change[-_ ]?me|password|jwt[-_ ]?secret|your[-_ ]?secret|test|dev|development|example|xxx+|\.\.\.)$/i;

export default {
  id: 'jwt-secret-weak',
  title: 'JWT signed with a short hard-coded secret',
  category: 'security',
  severity: 'critical',
  check(project) {
    const findings = [];
    for (const file of project.files) {
      if (!CODE.test(file)) continue;
      const text = project.read(file);
      for (const call of text.matchAll(JWT_CALL)) {
        const open = (call.index ?? 0) + call[0].length;
        const args = callArguments(text, open);
        const secret = literalValue(args[1] ?? '');
        if (secret === null) continue;
        const tooShort = secret.length < MIN_SECRET_LENGTH;
        if (!tooShort && !PLACEHOLDER.test(secret)) continue;
        const line = text.slice(0, call.index).split('\n').length;
        findings.push({
          file,
          line,
          message: tooShort
            ? `JWT is signed with a hard-coded secret of ${secret.length} characters, which is short enough to guess offline.`
            : 'JWT is signed with a placeholder secret that everyone copying this example will share.',
          fix: 'Read the secret from an environment variable such as `process.env.JWT_SECRET` and use at least 32 random bytes.',
        });
      }
    }
    return findings;
  },
};
