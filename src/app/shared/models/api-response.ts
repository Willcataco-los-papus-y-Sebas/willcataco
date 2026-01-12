export interface IResponse<T> {
  detail: string;
  status_code: number;
  ok: boolean;
  data: T;
}
