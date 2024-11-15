/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE account_status AS ENUM('inactive', 'active');

CREATE TABLE IF NOT EXISTS dumpsites (
    id SERIAL,
    dump_id VARCHAR PRIMARY KEY DEFAULT 'dump-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    status account_status DEFAULT 'inactive'::account_status,
    capacity integer DEFAULT 0,
    lastTransactionDate DATE,
    millName character varying,
    p1Amount NUMERIC(38,2),
    p1PriceTon INTEGER,
    is_deleted boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX dumpsites_dump_id_index ON dumpsites(dump_id);
CREATE INDEX dumpsites_latitude_index ON dumpsites(latitude);
CREATE INDEX dumpsites_status_index ON dumpsites(status);
CREATE INDEX dumpsites_created_at_index ON dumpsites(created_at);
CREATE INDEX dumpsites_longitude_index ON dumpsites(longitude);
