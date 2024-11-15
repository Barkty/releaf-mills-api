INSERT INTO dumpsites (
    millName,
    latitude,
    longitude,
    p1Amount,
    numTransactions,
    p1PriceTon,
    lastTransactionDate
) VALUES (
    $1, $2, $3, $4, $5, $6, $7
);
