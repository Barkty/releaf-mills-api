export default {
    createMill: `
        INSERT INTO mills (
            latitude,
            longitude,
            p1tmount,
            numtransactions,
            p1priceton,
            lastTransactiondate
        ) VALUES($1, $2, $3, $4)
        RETURNING latitude,
            longitude,
            p1tmount,
            numtransactions,
            p1priceton,
            lastTransactiondate,
            mill_id
            ;`,

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
            dumpsites
        WHERE 
            ((latitude = $1 OR $1 IS NULL)
             OR (longitude = $2 OR $2 IS NULL)) 
             AND (status = $3 OR $3 IS NULL) 
             AND ((lasttransactiondate::DATE BETWEEN $4::DATE AND $5::DATE) OR ($4 IS NULL AND $5 IS NULL));

    `,
}