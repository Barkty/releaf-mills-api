import { BaseEntity } from '../../shared/utils/entities/base-entity';

export class Mills extends BaseEntity<Mills> {
    latitude: string;
    longitude: string;
    numtransactions: number
    millname: string
    p1priceton: number;
    p1amount: number;
    lasttransactiondate: Date;
    created_at?: Date;
    updated_at?: Date;
    id?: string
}