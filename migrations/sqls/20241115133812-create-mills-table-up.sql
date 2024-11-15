/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS mills (
    id SERIAL,
    mill_id VARCHAR PRIMARY KEY DEFAULT 'mills-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    lastTransactionDate DATE,
    numtransactions INTEGER DEFAULT 0,
    millName character varying,
    p1Amount NUMERIC(38,2),
    p1PriceTon INTEGER,
    is_deleted boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX mills_mill_id_index ON mills(mill_id);
CREATE INDEX mills_latitude_index ON mills(latitude);
CREATE INDEX mills_created_at_index ON mills(created_at);
CREATE INDEX mills_longitude_index ON mills(longitude);

ALTER TABLE IF EXISTS dumpsites DROP COLUMN IF EXISTS lastTransactionDate;
ALTER TABLE IF EXISTS dumpsites DROP COLUMN IF EXISTS numtransactions;
ALTER TABLE IF EXISTS dumpsites DROP COLUMN IF EXISTS millName;
ALTER TABLE IF EXISTS dumpsites DROP COLUMN IF EXISTS p1Amount;
ALTER TABLE IF EXISTS dumpsites DROP COLUMN IF EXISTS p1PriceTon;
