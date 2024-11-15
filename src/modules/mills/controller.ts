import { fnRequest } from "../../shared/types";
import * as Dto from "./dto"
import * as Message from "../../shared/enums/message"
import millsServices from "./services";
import { BadException, handleCustomError } from "../../shared/errors";
import * as ApiResponse from '../../shared/response';
import { StatusCodes } from "http-status-codes";

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

        return ApiResponse.success(res, StatusCodes.OK, Message.FETCHED_DATA_SUCCESSFULLY('mills'), data);
    }
}

const millsController = new MillsController();

export default millsController;