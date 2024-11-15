import { fnRequest } from "../../shared/types";
import * as Dto from "./dto"
import * as Message from "../../shared/enums/message"
import dumpsiteServices from "./services";
import { BadException, handleCustomError } from "../../shared/errors";
import * as ApiResponse from '../../shared/response';
import { StatusCodes } from "http-status-codes";

export class DumpSiteController {
    public createDumpsite: fnRequest = async(req, res) => {
        const { body } = req;
        const payload = new Dto.CreateDumpSite(body);

        const resp = await dumpsiteServices.create(payload);

        if (resp instanceof BadException) {
            return handleCustomError(res, resp, StatusCodes.BAD_REQUEST)
        }

        return ApiResponse.success(res, StatusCodes.CREATED, Message.CREATED_DATA_SUCCESSFULLY('dumpsite'), resp);
    }
 
    public editDumpsite: fnRequest = async(req, res) => {
        const { body } = req;
        const payload = new Dto.CreateDumpSite(body);

        const resp = await dumpsiteServices.create(payload);

        if (resp instanceof BadException) {
            return handleCustomError(res, resp, StatusCodes.BAD_REQUEST)
        }

        return ApiResponse.success(res, StatusCodes.CREATED, Message.CREATED_DATA_SUCCESSFULLY('dumpsite'), resp);
    }
    
    public fetchDumpsite: fnRequest = async(req, res) => {
        const { query } = req;
        const payload = new Dto.FilterDumpSite(query);

        const data = await dumpsiteServices.fetch(payload)

        return ApiResponse.success(res, StatusCodes.OK, Message.FETCHED_DATA_SUCCESSFULLY('dumpsite'), data);
    }
}

const dumpsiteController = new DumpSiteController();

export default dumpsiteController;