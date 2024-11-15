import { BaseEntity } from '../../shared/utils/entities/base-entity';

export class CreateMills extends BaseEntity<CreateMills> {
    latitude: string
    longitude: string
    numtransactions: number
    p1amount: number
    millname: string
    p1priceton: number
    lasttransactiondate: Date
}

export class FilterMills extends BaseEntity<FilterMills> {
    latitude?: string
    longitude?: string
    from_date?: Date;
    to_date?: Date;
}

export class MillID extends BaseEntity<MillID> {
    mill_id: string
}