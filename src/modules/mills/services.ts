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
        const payload = [args.latitude, args.longitude, args.p1amount, args.numtransactions, args.p1priceton, args.lasttransactiondate]

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

    public async update(args: dumpDTO.CreateMills, mill_id: string): Promise<dumpParams.Mills | BadException> {
        const payload = [args.latitude, args.longitude, args.lasttransactiondate, args.millname, args.p1amount, args.p1priceton, args.numtransactions]

        // check if a dumpsite already exists with same co-ordinates
        let mill = await this.millsRepository.fetchSingleMill([mill_id]);

        if (!mill) {
            return new BadException(Message.RESOURCE_DOES_NOT_EXIST('Dumpsite'));
        }

        mill = await this.millsRepository.editMill(payload) as dumpParams.Mills;
        
        return mill;
    }
}


const millsServices = new MillsServicesImpl(millsRepository);

export default millsServices;