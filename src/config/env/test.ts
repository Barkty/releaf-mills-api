import { configDotenv } from 'dotenv';
configDotenv();

const test = {
    NODE_ENV: process.env.WERELEAF_NODE_ENV,
    PORT: process.env.WERELEAF_PORT,
    DATABASE_URL: process.env.WERELEAF_TEST_DATABASE_URL,
    DATABASE_HOST: process.env.WERELEAF_TEST_DATABASE_HOST,
    DATABASE_USER: process.env.WERELEAF_TEST_DATABASE_USER,
    DATABASE_PORT: process.env.WERELEAF_TEST_DATABASE_PORT,
    DATABASE_PASS: process.env.WERELEAF_TEST_DATABASE_PASS,
    DATABASE_NAME: process.env.WERELEAF_TEST_DATABASE_NAME,
}

export default test;