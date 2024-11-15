export default {
    createMill: `
        INSERT INTO mills (
            latitude,
            longitude,
            p1amount,
            numtransactions,
            p1priceton,
            lasttransactiondate
        ) VALUES($1, $2, $3, $4)
        RETURNING latitude,
            longitude,
            p1tmount,
            numtransactions,
            p1priceton,
            lasttransactiondate,
            mill_id;`,

    fetchSingleMill: `
        SELECT 
            mill_id,
            latitude,
            longitude,
            lasttransactiondate,
            millname,
            p1amount,
            p1priceton,
            is_deleted
            created_at,
            updated_at,
            numtransactions
        FROM 
            mills
        WHERE 
            latitude = $1 AND longitude = $2;

    `,

    fetchFilterMills: `
        SELECT 
            mill_id,
            latitude,
            longitude,
            lasttransactiondate,
            millname,
            p1amount,
            p1priceton,
            is_deleted
            created_at,
            updated_at,
            numtransactions
        FROM 
            mills
        WHERE 
            ((latitude = $1 OR $1 IS NULL)
             OR (longitude = $2 OR $2 IS NULL)) 
             AND ((lasttransactiondate::DATE BETWEEN $3::DATE AND $4::DATE) OR ($3 IS NULL AND $4 IS NULL));

    `,

    updateMill: `
    UPDATE mills
    SET 
        updated_at = NOW(),
        latitude = COALESCE($2, latitude),
        longitude = COALESCE($3, longitude),
        lasttransactiondate = COALESCE($4, lasttransactiondate),
        millname = COALESCE($5, millname),
        p1amount = COALESCE($6, p1amount),
        p1priceton = COALESCE($7, p1priceton),
        numtransactions = COALESCE($8, numtransactions)
     WHERE mill_id = $1
     RETURNING dump_id, longitude, last_name, status;`,
}