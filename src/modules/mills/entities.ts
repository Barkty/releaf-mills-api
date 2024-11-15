import { BaseEntity } from '../../shared/utils/entities/base-entity';

export class Mills extends BaseEntity<Mills> {
    latitude: string;
    longitude: string;
    status: 'inactive' | 'active';
    created_at?: Date;
    updated_at?: Date;
    id?: number
    numtrnsactions: number
    millname: string

}