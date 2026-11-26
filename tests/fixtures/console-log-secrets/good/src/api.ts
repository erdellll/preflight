export function done(result: { count: number }, token: string) {
  // The word appears only in the message, which is not a value.
  console.log('token refreshed');
  console.log('done', result.count);
  console.info(`scanned ${result.count} files`);
  return token;
}
