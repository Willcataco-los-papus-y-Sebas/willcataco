export interface WaterPayment {
    id: number;
    member_id: number;
    meter_id: number;
    amount: number;
    status: 'PAID' | 'UNPAID';
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}
