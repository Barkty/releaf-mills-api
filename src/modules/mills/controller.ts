import { fnRequest } from "../../shared/types";
import * as Dto from "./dto"
import * as Message from "../../shared/enums/message"
import millsServices from "./services";
import { BadException, handleCustomError } from "../../shared/errors";
import * as ApiResponse from '../../shared/response';
import { StatusCodes } from "http-status-codes";
import logger from "../../shared/logger";

export class MillsController {
    public createMills: fnRequest = async(req, res) => {
        const { body } = req;
        const payload = new Dto.CreateMills(body);

        const resp = await millsServices.create(payload);

        if (resp instanceof BadException) {
            return handleCustomError(res, resp, StatusCodes.BAD_REQUEST)
        }

        return ApiResponse.success(res, StatusCodes.CREATED, Message.CREATED_DATA_SUCCESSFULLY('mills'), resp);
    }
    
    public fetchMills: fnRequest = async(req, res) => {
        const { query } = req;
        const payload = new Dto.FilterMills(query);

        const data = await millsServices.fetch(payload)

        logger.info(`${payload.longitude} fetched mills successfully in the DB`, 'fetchMills.dumpsite.controllers.ts');
        return ApiResponse.success(res, StatusCodes.OK, Message.FETCHED_DATA_SUCCESSFULLY('mills'), data);
    }

    public editMills: fnRequest = async(req, res) => {
        const { body, params } = req;
        const payload = new Dto.CreateMills(body);
        const millId = new Dto.MillID(params);

        const resp = await millsServices.update(payload, millId.mill_id);

        if (resp instanceof BadException) {
            return handleCustomError(res, resp, StatusCodes.BAD_REQUEST)
        }

        return ApiResponse.success(res, StatusCodes.CREATED, Message.CREATED_DATA_SUCCESSFULLY('dumpsite'), resp);
    }
}

const millsController = new MillsController();

export default millsController;