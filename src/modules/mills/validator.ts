import Joi from 'joi';

export const fetchMillSchema = Joi.object().keys({
    longitude: Joi.number().label('Longitude'),
    latitude: Joi.number().label('Latitude'),
    from_date: Joi.date().label('Date Created From'),
    to_date: Joi.date().label('Date Created To'),
})

export const createMillSchema = Joi.object().keys({
    longitude: Joi.number().label('Longitude').required(),
    latitude: Joi.number().label('Latitude').required(),
    numtransactions: Joi.number().label('No. of Transactions').required(),
    millname: Joi.number().label('Mill Name').required(),
    p1priceton: Joi.number().label('P1 Price Per Ton').required(),
    p1amount: Joi.number().label('P1 Amount').required(),
    lasttransactiondate: Joi.date().label('Last Transaction Date').required(),
})

export const editMillSchema = Joi.object().keys({
    dump_id: Joi.string().label('Dump ID').required(),
})