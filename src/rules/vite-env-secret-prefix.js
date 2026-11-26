const ENV_FILE = /(?:^|\/)\.env(?:\.[\w.-]+)?$/;
const CODE = /\.(?:js|jsx|mjs|cjs|ts|tsx)$/;
/**
 * The prefixes that inline a value into the browser bundle: Vite's, Expo's and Create React App's.
 * `NEXT_PUBLIC_` has its own rule (`next-public-secret`), so it is not repeated here.
 */
const PUBLIC_PREFIXES = ['VITE_', 'EXPO_PUBLIC_', 'REACT_APP_'];
const PUBLIC_NAME = new RegExp(`\\b(?:${PUBLIC_PREFIXES.join('|')})[A-Za-z0-9_]*`, 'g');
/** The part of a public variable's name that says it must not be public. */
const SECRET_WORD = /SECRET|SERVICE_ROLE|PRIVATE|PASSWORD|PASSWD|ACCESS_TOKEN|API_KEY/i;
/**
 * Providers whose browser key is public by design: Firebase's web API key, Google Maps and Mapbox
 * tokens are restricted by domain, not kept secret, so `VITE_FIREBASE_API_KEY` is correct.
 */
const PUBLIC_BY_DESIGN = /FIREBASE|GOOGLE_MAPS|MAPS_API|MAPBOX|ALGOLIA_SEARCH|RECAPTCHA_SITE|POSTHOG|SENTRY_DSN/i;
const ASSIGNMENT = new RegExp(`^\\s*(?:export\\s+)?((?:${PUBLIC_PREFIXES.join('|')})[A-Za-z0-9_]*)\\s*=`);

/** Every public variable name an `.env` file declares. */
function namesInEnv(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.match(ASSIGNMENT)?.[1])
    .filter(Boolean);
}

export default {
  id: 'vite-env-secret-prefix',
  title: 'A public env variable names a secret',
  category: 'security',
  severity: 'critical',
  check(project) {
    const findings = [];
    for (const file of project.files) {
      const isEnv = ENV_FILE.test(file);
      if (!isEnv && !CODE.test(file)) continue;
      const text = project.read(file);
      const names = isEnv ? namesInEnv(text) : (text.match(PUBLIC_NAME) ?? []);
      for (const name of new Set(names)) {
        const prefix = PUBLIC_PREFIXES.find((p) => name.startsWith(p));
        const rest = prefix ? name.slice(prefix.length) : '';
        if (!prefix || !SECRET_WORD.test(rest) || PUBLIC_BY_DESIGN.test(rest)) continue;
        findings.push({
          file,
          message: `${name} starts with ${prefix}, so its value is inlined into the browser bundle, but its name says it is a secret.`,
          fix: `Rename it without the ${prefix} prefix and read it only on the server, or use a publishable key instead of ${name}.`,
        });
      }
    }
    return findings;
  },
};
