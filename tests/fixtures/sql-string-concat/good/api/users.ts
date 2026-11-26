import { db } from './db';
import sql from 'sql-template-tag';

export const byId = (id: string) => db.query('SELECT * FROM users WHERE id = $1', [id]);

export const byName = (name: string) => db.query(sql`SELECT * FROM users WHERE name = ${name}`);

export const all = () => db.query(`SELECT * FROM users`);
