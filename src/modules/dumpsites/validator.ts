import Joi from 'joi';

export const fetchDumpsiteSchema = Joi.object().keys({
    status: Joi.string().label('Dumpsite Status').valid('active', 'inactive'),
    longitude: Joi.number().label('Longitude'),
    latitude: Joi.number().label('Latitude'),
    from_date: Joi.date().label('Date Created From'),
    to_date: Joi.date().label('Date Created To'),
})

export const createDumpsiteSchema = Joi.object().keys({
    longitude: Joi.number().label('Longitude').required(),
    latitude: Joi.number().label('Latitude').required(),
    capacity: Joi.number().label('Capacity').required(),
    status: Joi.string().label('Dumpsite Status').valid('active', 'inactive').required()
})

export const editDumpsiteSchema = Joi.object().keys({
    dump_id: Joi.string().label('Dump ID').required(),
})