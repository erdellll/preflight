import jwt from 'jsonwebtoken';

export const signIn = (payload: object) => jwt.sign(payload, 'secret');

export const check = (token: string) =>
  jwt.verify(token, 'changeme', { algorithms: ['HS256'] });

export const signAll = (rows: object[]) => jwt.sign({ rows }, 'short');
