const CODE = /\.(?:js|jsx|mjs|cjs|ts|tsx|py|rb|php|go|java|kt)$/;
/**
 * The shape of a statement, not just its first word: interface copy such as `Select ${n} items` or
 * `Last update: ${when}` uses the same words, and matching case-insensitively on the word alone
 * flagged it as SQL injection.
 */
const SQL_WORD = /\bSELECT\s+(?:\*|DISTINCT\b|\$\{[^}]*\}|[\w."`]+(?:\s*,\s*[\w."`]+)*)\s+FROM\s+[\w."`$]|\bINSERT\s+INTO\s+[\w."`$]|\bUPDATE\s+[\w."`$]+\s+SET\b|\bDELETE\s+FROM\s+[\w."`$]/i;
const INTERPOLATION = /\$\{[^}]*\}/;
const TEMPLATE = /`(?:[^`\\]|\\.)*`/g;
const CONCAT = /(['"])(?:(?!\1)[^\\]|\\.)*\b(?:SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM)\b(?:(?!\1)[^\\]|\\.)*\1\s*\+|\+\s*(['"])(?:(?!\2)[^\\]|\\.)*\b(?:SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM)\b/i;
/** A tagged template hands its values to the library, which escapes or binds them. */
const TAGGED = /(?:^|[^\w$.])([A-Za-z_$][\w$.]*)\s*$/;

export default {
  id: 'sql-string-concat',
  title: 'SQL built from user input',
  category: 'security',
  severity: 'warning',
  check(project) {
    const findings = [];
    for (const file of project.files) {
      if (!CODE.test(file)) continue;
      project.lines(file).forEach((line, i) => {
        let line_has_finding = false;
        for (const template of line.matchAll(TEMPLATE)) {
          if (!SQL_WORD.test(template[0]) || !INTERPOLATION.test(template[0])) continue;
          const before = line.slice(0, template.index);
          if (TAGGED.test(before)) continue;
          line_has_finding = true;
          break;
        }
        if (!line_has_finding && CONCAT.test(line)) line_has_finding = SQL_WORD.test(line);
        if (!line_has_finding) return;
        findings.push({
          file,
          line: i + 1,
          message: 'SQL is assembled by joining strings, so a value that comes from a request is read as part of the query rather than as data.',
          fix: 'Pass the value as a bound parameter, for example `db.query("SELECT * FROM users WHERE id = $1", [id])`, or use the tagged template your driver provides.',
        });
      });
    }
    return findings;
  },
};
