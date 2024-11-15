import { configDotenv } from 'dotenv';
configDotenv();

const production = {
    NODE_ENV: process.env.WERELEAF_NODE_ENV,
    PORT: process.env.WERELEAF_PORT,
    DATABASE_URL: process.env.WERELEAF_PROD_DATABASE_URL
}

export default production;