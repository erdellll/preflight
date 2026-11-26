const PYTHON = /\.py$/;
const JAVASCRIPT = /\.(?:js|jsx|mjs|cjs|ts|tsx)$/;
/** A settings file the app really starts from, not a test's or a developer's own override. */
const NOT_PRODUCTION = /(?:^|\/)(?:tests?|spec|__tests__)\/|(?:^|\/)local_settings\.py$/;
/** `DEBUG = True`: the value is the literal, not an expression that reads one at runtime. */
const DJANGO_DEBUG = /^\s*DEBUG\s*=\s*True\s*(?:#.*)?$/;
/** `app.run(debug=True)` and `app.run(..., debug = True, ...)`. */
const FLASK_DEBUG = /\bapp\s*\.\s*run\s*\([^)]*\bdebug\s*=\s*True\b/;
/** Express's environment name: `app.set('env', 'development')`. */
const EXPRESS_DEV = /\bapp\s*\.\s*set\s*\(\s*['"]env['"]\s*,\s*['"]development['"]\s*\)/;

export default {
  id: 'debug-mode-production',
  title: 'Debug mode is on',
  category: 'security',
  severity: 'warning',
  check(project) {
    const findings = [];
    for (const file of project.files) {
      if (NOT_PRODUCTION.test(file)) continue;
      const isPython = PYTHON.test(file);
      const isJs = JAVASCRIPT.test(file);
      if (!isPython && !isJs) continue;
      project.lines(file).forEach((line, i) => {
        const hit =
          (isPython && (DJANGO_DEBUG.test(line) || FLASK_DEBUG.test(line))) ||
          (isJs && EXPRESS_DEV.test(line));
        if (!hit) return;
        findings.push({
          file,
          line: i + 1,
          message: 'Debug mode is switched on in code that ships, so error pages, stack traces or verbose logs reach real users.',
          fix: 'Read the flag from the environment and default it to off, for example `DEBUG = os.environ.get("DEBUG") == "1"`.',
        });
      });
    }
    return findings;
  },
};
