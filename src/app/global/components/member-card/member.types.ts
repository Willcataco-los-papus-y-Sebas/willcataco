export interface Member {
    id: number;
    user_id: number;
    name: string;
    last_name: string;
    ci: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}
