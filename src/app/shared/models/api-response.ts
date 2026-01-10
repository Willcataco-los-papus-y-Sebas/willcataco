export interface ApiResponse<T> {
  detail: string;
  status_code: number;
  data: T;
  limit?: number;
  offset?: number;
  page?: number;
  total?: number;
}
