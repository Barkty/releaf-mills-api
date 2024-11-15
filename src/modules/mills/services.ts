import { BadException } from "../../shared/errors";
import * as Message from "../../shared/enums/message"
import * as dumpParams from "./entities";
import * as dumpDTO from './dto'
import millsRepository, { MillsRepository } from "./repository";

export interface MillsServices {
    create(args: dumpDTO.CreateMills): Promise<dumpParams.Mills | BadException>
    fetch(args: Partial<dumpParams.Mills>): Promise<dumpParams.Mills[]>
}

export class MillsServicesImpl implements MillsServices {
    constructor(private readonly millsRepository: MillsRepository) {}

    public async create(args: dumpDTO.CreateMills): Promise<dumpParams.Mills | BadException> {
        const filter = [args.latitude, args.longitude]
        const payload = [args.latitude, args.longitude, args.numtransactions, args.millName, args.p1Amount, args.p1PriceTon]

        // check if a dumpsite already exists with same co-ordinates
        let dumpsite = await this.millsRepository.fetchSingleMill(filter);

        if (dumpsite) {
            return new BadException(Message.RESOURCE_ALREADY_EXISTS('Mill with same co-ordinates already exists'))
        }

        dumpsite = await this.millsRepository.createMill(payload);
        
        return dumpsite;
    }

    public async fetch(args: Partial<dumpDTO.FilterMills>): Promise<dumpParams.Mills[]> {
        const payload = [
            args.latitude,
            args.latitude,
            args.from_date,
            args.to_date,
        ]
        const data = await this.millsRepository.fetchAndFilterMill(payload);

        return data;
    }
}


const millsServices = new MillsServicesImpl(millsRepository);

export default millsServices;