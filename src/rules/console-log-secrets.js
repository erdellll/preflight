const CODE = /\.(?:js|jsx|mjs|cjs|ts|tsx|py|rb)$/;
/** The logging calls whose arguments end up in a terminal, a log file or a crash reporter. */
const LOG_CALL = /\b(?:console\s*\.\s*(?:log|info|debug|warn|error|trace)|print)\s*\(/g;
/** A variable name that says its value is a credential. */
const SECRET_NAME = /password|passwd|token|secret|apikey|api_key|authorization|credential|privatekey|private_key/i;

/**
 * The arguments of the call starting at `open`, as text with surrounding spaces removed. Tracking
 * quotes and bracket depth is what lets the check look at the arguments and never at the message.
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

/**
 * True when the argument is a plain string, which is a message rather than a value. A template
 * literal with an interpolation is not a message: its `${token}` prints the value.
 */
const isLiteral = (argument) =>
  /^(['"])(?:\\.|(?!\1)[^\\])*\1$/.test(argument) ||
  // A template with no `${` at all: the negative lookahead is on the whole body, because the
  // character class below would otherwise consume the `$` and leave `{...}` to match as text.
  /^`(?!.*\$\{)[^`\\]*(?:\\.[^`\\]*)*`$/s.test(argument);

/**
 * The identifier an argument reads from when it is not a literal: `token`, `user.apiKey`,
 * `req.headers.authorization`. Dotted and indexed access is joined so the last name is visible.
 */
function readName(argument) {
  const path = argument.match(/^[A-Za-z_$][\w$]*(?:\s*(?:\.\s*[A-Za-z_$][\w$]*|\[[^\]]*\])?)*/);
  return path ? path[0] : '';
}

export default {
  id: 'console-log-secrets',
  title: 'A log call prints a secret',
  category: 'security',
  severity: 'warning',
  check(project) {
    const findings = [];
    for (const file of project.files) {
      if (!CODE.test(file)) continue;
      const text = project.read(file);
      for (const call of text.matchAll(LOG_CALL)) {
        const open = (call.index ?? 0) + call[0].length;
        const args = callArguments(text, open);
        // A template literal with `${...}` prints what it interpolates, so its inner expressions are
        // read as well; a plain string is a message and contributes nothing.
        const values = args.filter((a) => !isLiteral(a));
        const interpolated = values.flatMap((a) =>
          [...a.matchAll(/\$\{([^{}]*)\}/g)].map((m) => m[1].trim()),
        );
        const fromRead = [...values, ...interpolated].find((a) => SECRET_NAME.test(readName(a)));
        // An object literal prints every property it holds, so a secret-named key inside one is
        // logged just as surely as a bare variable; the key is what the message can name.
        const fromObject = values.find((a) => /\b[A-Za-z_$][\w$]*\s*:/.test(a) && SECRET_NAME.test(a));
        if (!fromRead && !fromObject) continue;
        const named = fromRead ? readName(fromRead) : (fromObject.match(/\b([A-Za-z_$][\w$]*)\s*:/)?.[1] ?? 'a secret');
        const line = text.slice(0, call.index).split('\n').length;
        findings.push({
          file,
          line,
          message: `This log call prints ${named}, whose name says it holds a credential; logs outlive the request and are often shipped to a third party.`,
          fix: `Log the fact rather than the value, for example the user id, or delete ${named} from the call.`,
        });
      }
    }
    return findings;
  },
};
