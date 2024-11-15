import { BaseEntity } from '../../shared/utils/entities/base-entity';

export class DumpSite extends BaseEntity<DumpSite> {
    latitude: string;
    longitude: string;
    status: 'inactive' | 'active';
    capacity: number;
    created_at?: Date;
    updated_at?: Date;
    id?: number
}