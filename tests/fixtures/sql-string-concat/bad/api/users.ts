import { db } from './db';

export const byId = (req: { params: { id: string } }) =>
  db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);

export const search = (req: { query: { name: string } }) =>
  db.query("SELECT * FROM users WHERE name = '" + req.query.name + "'");
