export default {
    createDumpsite: `
        INSERT INTO dumpsites (
            latitude,
            longitude,
            status,
            capacity
        ) VALUES($1, $2, $3, $4)
        RETURNING dump_id, latitude, longitude, status, capacity;`,

    fetchSingleDumpsite: `
        SELECT 
            dump_id, 
            latitude,
            longitude,
            status,
            capacity
        FROM 
            dumpsites
        WHERE 
            latitude = $1 AND longitude = $2;

    `,
    fetchSingleDumpsiteById: `
        SELECT 
            dump_id, 
            latitude,
            longitude,
            status,
            capacity
        FROM 
            dumpsites
        WHERE 
            dump_id = $1;

    `,

    fetchFilterDumpsites: `
        SELECT 
            dump_id,
            latitude,
            longitude,
            status,
            capacity,
            created_at,
            updated_at
        FROM 
            dumpsites
        WHERE 
            ((latitude = $1 OR $1 IS NULL)
             OR (longitude = $2 OR $2 IS NULL)) 
             AND (status = $3 OR $3 IS NULL) 
             AND ((created_at::DATE BETWEEN $4::DATE AND $5::DATE) OR ($4 IS NULL AND $5 IS NULL));

    `,
    updateDumpsite: `
        UPDATE dumpsites
        SET 
            updated_at = NOW(),
            latitude = COALESCE($2, latitude),
            longitude = COALESCE($3, longitude),
            capacity = COALESCE($4, capacity),
            status = COALESCE($5, status)
         WHERE dump_id = $1
         RETURNING dump_id, longitude, last_name, status;`,
}