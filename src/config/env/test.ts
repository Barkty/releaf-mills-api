import { configDotenv } from 'dotenv';
configDotenv();

const test = {
    NODE_ENV: process.env.WERELEAF_NODE_ENV,
    PORT: process.env.WERELEAF_PORT,
    DATABASE_URL: process.env.WERELEAF_TEST_DATABASE_URL
}

export default test;