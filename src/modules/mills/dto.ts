import { BaseEntity } from '../../shared/utils/entities/base-entity';

export class CreateMills extends BaseEntity<CreateMills> {
    latitude: string
    longitude: string
    numtransactions: number
    p1Amount: number
    millName: string
    p1PriceTon: number
    lastTransactionDate: Date
}

export class FilterMills extends BaseEntity<FilterMills> {
    latitude?: string
    longitude?: string
    from_date?: Date;
    to_date?: Date;
}