import pgp from 'pg-promise';
import promise from 'bluebird';
import Env from '../shared/utils/envholder/env';

const pg = pgp({ promiseLib: promise, noWarnings: true });
const db = pg(Env.get<string>('DATABASE_URL'));

// Initialize google fire-store database

export { db };
