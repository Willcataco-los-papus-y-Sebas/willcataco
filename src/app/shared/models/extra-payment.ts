export interface ExtraPayment {
  id: number;
  name: string;
  description?: string;
  amount: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface ExtraPaymentCreate {
  name: string;
  description?: string;
  amount: number;
}

export interface ExtraPaymentUpdate {
  name?: string;
  description?: string;
  amount?: number;
  is_active?: boolean;
}