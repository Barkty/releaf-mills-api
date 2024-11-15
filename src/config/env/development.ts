import { configDotenv } from 'dotenv';
configDotenv();

const development = {
    NODE_ENV: process.env.WERELEAF_NODE_ENV,
    PORT: process.env.WERELEAF_PORT,
    DATABASE_URL: process.env.WERELEAF_DEV_DATABASE_URL
}

export default development;