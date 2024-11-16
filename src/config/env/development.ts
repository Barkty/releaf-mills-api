import { configDotenv } from 'dotenv';
configDotenv();

const development = {
    NODE_ENV: process.env.WERELEAF_NODE_ENV,
    PORT: process.env.WERELEAF_PORT,
    DATABASE_URL: process.env.WERELEAF_DEV_DATABASE_URL,
    DATABASE_HOST: process.env.WERELEAF_DEV_DATABASE_HOST,
    DATABASE_USER: process.env.WERELEAF_DEV_DATABASE_USER,
    DATABASE_PORT: process.env.WERELEAF_DEV_DATABASE_PORT,
    DATABASE_PASS: process.env.WERELEAF_DEV_DATABASE_PASS,
    DATABASE_NAME: process.env.WERELEAF_DEV_DATABASE_NAME,
}

export default development;