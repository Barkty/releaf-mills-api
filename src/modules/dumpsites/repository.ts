import { db } from "../../config/database";
import * as dumpParams from "./entities";
import dumpQueries from './query'

export interface DumpSiteRepository {
    createDumpsite(args:  (string | number)[]): Promise<dumpParams.DumpSite>;
    fetchSingleDumpsite(args: string[]): Promise<dumpParams.DumpSite | null>
    fetchSingleDumpsiteById(args: string[]): Promise<dumpParams.DumpSite | null>
    fetchAndFilterDumpsites(args: any[]): Promise<dumpParams.DumpSite[]>
    editDumpSite(args: any[]): Promise<dumpParams.DumpSite | null>
}

export class DumpSiteRepositoryImpl implements DumpSiteRepository {
    public async createDumpsite(args:  (string | number)[]): Promise<dumpParams.DumpSite> {
        return db.one(dumpQueries.createDumpsite, args);
    }

    public async fetchSingleDumpsite(args: string[]): Promise<dumpParams.DumpSite | null> {
        return db.oneOrNone(dumpQueries.fetchSingleDumpsite, args)
    }
    
    public async fetchSingleDumpsiteById(args: string[]): Promise<dumpParams.DumpSite | null> {
        return db.oneOrNone(dumpQueries.fetchSingleDumpsiteById, args)
    }
    
    public async fetchAndFilterDumpsites(args: string[]): Promise<dumpParams.DumpSite[]> {
        return db.any(dumpQueries.fetchFilterDumpsites, args)
    }
   
    public async editDumpSite(args: string[]): Promise<dumpParams.DumpSite | null> {
        return db.oneOrNone(dumpQueries.updateDumpsite, args)
    }
}


const dumpsiteRepository = new DumpSiteRepositoryImpl();

export default dumpsiteRepository;