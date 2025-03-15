/* eslint-disable @typescript-eslint/no-explicit-any */

export interface StringKeyObject {
  [key: string]: any;
}

export type TApiState = Record<string, any> | null;

export default interface ApiResponse {
  data: TApiState;
  message: string;
  success: string;
  error:   string;
}
