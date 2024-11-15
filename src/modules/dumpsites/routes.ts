import { Router } from 'express';
import * as dumpsiteValidator from './validator';
import dumpsiteController from './controller';
import { WatchAsyncController } from '../../shared/utils/watch-async-controller';
import { validateDataMiddleware } from '../../shared/middlewares/request-body-validator.middleware';

const dumpsiteRouter = Router();

dumpsiteRouter.get('/',
    validateDataMiddleware(dumpsiteValidator.fetchDumpsiteSchema, 'query'),
    WatchAsyncController(dumpsiteController.fetchDumpsite)
)

dumpsiteRouter.post('/new',
    validateDataMiddleware(dumpsiteValidator.createDumpsiteSchema, 'payload'),
    WatchAsyncController(dumpsiteController.createDumpsite)
)

dumpsiteRouter.patch('/:dump_id',
    validateDataMiddleware(dumpsiteValidator.editDumpsiteSchema, 'params'),
    validateDataMiddleware(dumpsiteValidator.createDumpsiteSchema, 'payload'),
    WatchAsyncController(dumpsiteController.editDumpsite)
)

export default dumpsiteRouter;