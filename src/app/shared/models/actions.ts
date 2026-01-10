export enum ActionStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  PENDING = 'PENDING',
}

export interface Action {
  id: number;
  member_id: number;
  street_id: number;
  total_price: number;
  status: ActionStatus;
  created_at: string;
  updated_at: string;
}

export interface ActionCreate {
  member_id: number;
  street_id: number;
  total_price: number;
}

export interface ActionPatch {
  member_id?: number;
  street_id?: number;
  total_price?: number;
  status?: ActionStatus;
}
