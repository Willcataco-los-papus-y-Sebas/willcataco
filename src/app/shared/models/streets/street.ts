export interface Street {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface StreetCreate {
    name: string;
}

export interface StreetUpdate {
    name?: string;
}