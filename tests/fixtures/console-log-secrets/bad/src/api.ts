export async function login(req: { body: { password: string }; headers: { authorization: string } }) {
  const token = 'issued';
  console.log('token', token);
  console.log(`auth=${req.headers.authorization}`);
  console.error({ apiKey: process.env.API_KEY });
  console.log('password for', req.body.password);
  return token;
}
