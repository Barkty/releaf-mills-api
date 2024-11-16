import fs from 'fs'
import pgp from 'pg-promise';
import promise from 'bluebird';
import Env from '../shared/utils/envholder/env';

const pg_promise = pgp({ promiseLib: promise, noWarnings: true });
const db = pg_promise({ 
    connectionString: Env.get<string>('DATABASE_URL'),
    ssl: {
        ca: fs.readFileSync('certs/ca-certificate.crt').toString(), // Use the CA certificate
    },
})

export { db };
