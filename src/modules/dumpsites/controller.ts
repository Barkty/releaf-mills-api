import { fnRequest } from "../../shared/types";
import * as Dto from "./dto"
import * as Message from "../../shared/enums/message"
import dumpsiteServices from "./services";
import { BadException, handleCustomError } from "../../shared/errors";
import * as ApiResponse from '../../shared/response';
import { StatusCodes } from "http-status-codes";
import logger from '../../shared/logger';

export class DumpSiteController {
    public createDumpsite: fnRequest = async(req, res) => {
        const { body } = req;
        const payload = new Dto.CreateDumpSite(body);

        const resp = await dumpsiteServices.create(payload);

        if (resp instanceof BadException) {
            logger.info(`${payload.longitude} failed to create in the DB`, 'createDumpsite.dumpsite.controllers.ts');
            return handleCustomError(res, resp, StatusCodes.BAD_REQUEST)
        }
        logger.info(`${payload.longitude} created in the DB`, 'createDumpsite.dumpsite.controllers.ts');
        return ApiResponse.success(res, StatusCodes.CREATED, Message.CREATED_DATA_SUCCESSFULLY('dumpsite'), resp);
    }
 
    public editDumpsite: fnRequest = async(req, res) => {
        const { body, params } = req;

        const payload = new Dto.CreateDumpSite(body);
        const dumpId = new Dto.DumpID(params);
        const resp = await dumpsiteServices.update(payload, dumpId.dump_id);

        if (resp instanceof BadException) {
            logger.info(`${payload.longitude} failed to edit in the DB`, 'editDumpsite.dumpsite.controllers.ts');
            return handleCustomError(res, resp, StatusCodes.BAD_REQUEST)
        }

        logger.info(`${payload.longitude} edited successfully in the DB`, 'editDumpsite.dumpsite.controllers.ts');
        return ApiResponse.success(res, StatusCodes.CREATED, Message.CREATED_DATA_SUCCESSFULLY('dumpsite'), resp);
    }
    
    public fetchDumpsite: fnRequest = async(req, res) => {
        const { query } = req;
        const payload = new Dto.FilterDumpSite(query);

        const data = await dumpsiteServices.fetch(payload)

        logger.info(`${payload.longitude} fetched pks dumpsites successfully in the DB`, 'fetchDumpsite.dumpsite.controllers.ts');
        return ApiResponse.success(res, StatusCodes.OK, Message.FETCHED_DATA_SUCCESSFULLY('dumpsite'), data);
    }
}

const dumpsiteController = new DumpSiteController();

export default dumpsiteController;