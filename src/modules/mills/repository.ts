import { db } from "../../config/database";
import * as dumpParams from "./entities";
import dumpQueries from './query'

export interface MillsRepository {
    createMill(args:  (string | number)[]): Promise<dumpParams.Mills>;
    fetchSingleMill(args: any[]): Promise<dumpParams.Mills | null>
    fetchAndFilterMill(args: any[]): Promise<dumpParams.Mills[]>
}

export class MillsRepositoryImpl implements MillsRepository {
    public async createMill(args:  (string | number)[]): Promise<dumpParams.Mills> {
        return db.one(dumpQueries.createMill, args);
    }

    public async fetchSingleMill(args: string[]): Promise<dumpParams.Mills | null> {
        return db.oneOrNone(dumpQueries.fetchSingleMill, args)
    }
    
    public async fetchAndFilterMill(args: string[]): Promise<dumpParams.Mills[]> {
        return db.any(dumpQueries.fetchFilterMills, args)
    }
}


const millsRepository = new MillsRepositoryImpl();

export default millsRepository;