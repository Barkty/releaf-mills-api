/* Replace with your SQL commands */
DROP INDEX IF EXISTS dumpsites_dump_id_index;
DROP INDEX IF EXISTS dumpsites_latitude_index;
DROP INDEX IF EXISTS dumpsites_status_index;
DROP INDEX IF EXISTS dumpsites_created_at_index;
DROP INDEX IF EXISTS dumpsites_longitude_index;

DROP TABLE IF EXISTS dumpsites CASCADE;
DROP TYPE IF EXISTS account_status;