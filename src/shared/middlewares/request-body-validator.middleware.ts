import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export const validateDataMiddleware = (validationSchema: Joi.ObjectSchema, type: string) => 
  (req: Request, res: Response, next: NextFunction): void => {
    const getType = {
        payload: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers
    };

    const options = { messages: { key: '{{key}} ' } };
    const data = (getType as Record<string, any>)[type]; 

    const validationResult = validationSchema.validate(data, options);
    if (!validationResult.error) {
        next(); // This remains a `void` return
        return; // Ensures function exits without returning `Response`
    }

    const { message } = validationResult.error.details[0];
    
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        status: 'error',
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: message.replace(/"/gi, '')
    });
    return; // Ensures function exits as `void`
};

