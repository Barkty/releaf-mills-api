import { BadException } from "../../shared/errors";
import * as Message from "../../shared/enums/message"
import * as dumpParams from "./entities";
import * as dumpDTO from './dto'
import dumpsiteRepository, { DumpSiteRepository } from "./repository";

export interface DumpSiteServices {
    create(args: dumpParams.DumpSite): Promise<dumpParams.DumpSite | BadException>
    update(args: dumpParams.DumpSite, dump_id: string): Promise<dumpParams.DumpSite | BadException>
    fetch(args: Partial<dumpParams.DumpSite>): Promise<dumpParams.DumpSite[]>
}

export class DumpSiteServicesImpl implements DumpSiteServices {
    constructor(private readonly dumpsiteRepository: DumpSiteRepository) {}

    public async create(args: dumpParams.DumpSite): Promise<dumpParams.DumpSite | BadException> {
        const filter = [args.latitude, args.longitude]
        const payload = [args.latitude, args.longitude, args.status, args.capacity]

        // check if a dumpsite already exists with same co-ordinates
        let dumpsite = await this.dumpsiteRepository.fetchSingleDumpsite(filter);

        if (dumpsite) {
            return new BadException(Message.RESOURCE_ALREADY_EXISTS('Dumpsite with same co-ordinates already exists'))
        }

        dumpsite = await this.dumpsiteRepository.createDumpsite(payload);
        
        return dumpsite;
    }
    
    public async update(args: dumpParams.DumpSite, dump_id: string): Promise<dumpParams.DumpSite | BadException> {
        const payload = [args.latitude, args.longitude, args.status, args.capacity]

        // check if a dumpsite already exists with same co-ordinates
        let dumpsite = await this.dumpsiteRepository.fetchSingleDumpsiteById([dump_id]);

        if (!dumpsite) {
            return new BadException(Message.RESOURCE_DOES_NOT_EXIST('Dumpsite'))
        }

        dumpsite = await this.dumpsiteRepository.editDumpSite(payload) as dumpParams.DumpSite;
        
        return dumpsite;
    }

    public async fetch(args: Partial<dumpDTO.FilterDumpSite>): Promise<dumpParams.DumpSite[]> {
        const payload = [
            args.latitude,
            args.latitude,
            args.status,
            args.from_date,
            args.to_date,
        ]
        const data = await this.dumpsiteRepository.fetchAndFilterDumpsites(payload);

        return data;
    }
}


const dumpsiteServices = new DumpSiteServicesImpl(dumpsiteRepository);

export default dumpsiteServices;