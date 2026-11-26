const ENV_FILE = /(?:^|\/)\.env(?:\.[\w.-]+)?$/;
const CODE = /\.(?:js|jsx|mjs|cjs|ts|tsx)$/;
/** Anything under this prefix ships to the browser; the name is what makes it a secret. */
const PUBLIC_NAME = /\bNEXT_PUBLIC_[A-Z0-9_]*/g;
/**
 * The part of a public variable's name that says it must not be public. `ANON` and `PUBLISHABLE`
 * are deliberately absent: Supabase's anon key and Stripe's publishable key are meant for the
 * browser, and flagging them would teach people to ignore this check.
 */
const SECRET_WORD = /SECRET|SERVICE_ROLE|PRIVATE|PASSWORD|PASSWD|ACCESS_TOKEN|API_KEY/i;
/**
 * Providers whose browser key is public by design: Firebase's web API key, Google Maps and Mapbox
 * tokens are restricted by domain, not kept secret, so `NEXT_PUBLIC_FIREBASE_API_KEY` is correct.
 */
const PUBLIC_BY_DESIGN = /FIREBASE|GOOGLE_MAPS|MAPS_API|MAPBOX|ALGOLIA_SEARCH|RECAPTCHA_SITE|POSTHOG|SENTRY_DSN/i;
/** Reading the value at runtime is not a leak of a literal; the name is still what matters. */
const ASSIGNMENT = /^\s*(?:export\s+)?(NEXT_PUBLIC_[A-Za-z0-9_]*)\s*=/;
const REFERENCE = /\bNEXT_PUBLIC_[A-Za-z0-9_]*\b/g;

/** Every public variable name a `.env` file declares. */
function namesInEnv(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.match(ASSIGNMENT)?.[1])
    .filter(Boolean);
}

/** Every `NEXT_PUBLIC_*` name a source file mentions, in code or in `process.env`. */
function namesInCode(text) {
  return text.match(PUBLIC_NAME) ?? [];
}

export default {
  id: 'next-public-secret',
  title: 'A NEXT_PUBLIC_ variable names a secret',
  category: 'security',
  severity: 'critical',
  check(project) {
    const findings = [];
    for (const file of project.files) {
      const isEnv = ENV_FILE.test(file);
      if (!isEnv && !CODE.test(file)) continue;
      const names = isEnv ? namesInEnv(project.read(file)) : namesInCode(project.read(file));
      for (const name of new Set(names)) {
        const rest = name.slice('NEXT_PUBLIC_'.length);
        if (!SECRET_WORD.test(rest) || PUBLIC_BY_DESIGN.test(rest)) continue;
        findings.push({
          file,
          message: `${name} is prefixed NEXT_PUBLIC_, so its value is inlined into the browser bundle, but its name says it is a secret.`,
          fix: `Rename it without the NEXT_PUBLIC_ prefix and read it only on the server, or use a publishable key instead of ${name}.`,
        });
      }
    }
    return findings;
  },
};
