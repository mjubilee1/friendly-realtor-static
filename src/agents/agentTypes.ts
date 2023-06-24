export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
export type AxiosRequestHeaders = Record<string, string | number | boolean>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AxiosRequestConfig<D = any> {
  method?: string;
  url?: string;
  responseType?: ResponseType;
  data?: D;
  headers?: AxiosRequestHeaders;
}

export type UserToken = {
  exp?: number;
};
