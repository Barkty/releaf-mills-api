import { BaseEntity } from '../../shared/utils/entities/base-entity';

export class CreateDumpSite extends BaseEntity<CreateDumpSite> {
    status: 'active' | 'inactive';
    latitude: string
    longitude: string
    capacity: number
}

export class FilterDumpSite extends BaseEntity<FilterDumpSite> {
    status?: 'active' | 'inactive';
    latitude?: string
    longitude?: string
    capacity?: number
    from_date?: Date;
    to_date?: Date;
}

export class DumpID extends BaseEntity<DumpID> {
    dump_id: string
}