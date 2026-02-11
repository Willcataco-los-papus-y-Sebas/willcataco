export type PaymentType = 'water' | 'extra';
export type PaymentStatus = 'PAID' | 'UNPAID';

export interface PaymentDetail {
  label: string;
  value: string;
  fullWidth?: boolean;
}

export interface PendingPayment {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  type: PaymentType;
}

export interface WaterBill {
  id: number;
  period: string;
  amount: number;
  previousReading: number;
  currentReading: number;
  consumption: number;
  status: PaymentStatus;
  dueDate: string;
}

export interface MemberExtraPaymentItem {
  id: number;
  name: string;
  description: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  dueDate: string;
}
