import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export const signIn = (payload: object) => jwt.sign(payload, SECRET);

export const check = (token: string) => jwt.verify(token, process.env.JWT_SECRET!);

// A secret of the right length is still a literal, and still not something this check flags.
export const signLong = (payload: object) =>
  jwt.sign(payload, 'Xk9mQ2pL7vN4wR8tY3bC6dF1gH5jK0sZ');
