import { Router } from 'express';
import * as millValidator from './validator';
import dumpsiteController from './controller';
import { WatchAsyncController } from '../../shared/utils/watch-async-controller';
import { validateDataMiddleware } from '../../shared/middlewares/request-body-validator.middleware';

const dumpsiteRouter = Router();

dumpsiteRouter.get('/',
    validateDataMiddleware(millValidator.fetchMillSchema, 'query'),
    WatchAsyncController(dumpsiteController.fetchMills)
)

dumpsiteRouter.post('/new',
    validateDataMiddleware(millValidator.createMillSchema, 'payload'),
    WatchAsyncController(dumpsiteController.createMills)
)

dumpsiteRouter.patch('/:dump_id',
    validateDataMiddleware(millValidator.editMillSchema, 'params'),
    validateDataMiddleware(millValidator.createMillSchema, 'payload'),
    WatchAsyncController(dumpsiteController.editMills)
)

export default dumpsiteRouter;