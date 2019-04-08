export interface Cache {
  get(key: string, cb: (err: Error|null, value: any) => void): void
  set(key: string, value: any, cb: (err: Error|null) => void): void
  has(key: string, cb: (err: Error|null, exists: boolean) => void): void
  remove(key: string, cb: (err: Error|null) => void): void

  promise: {
    get(key: string): Promise<any>
    set(key: string, value: any): Promise<undefined>
    has(key: string): Promise<boolean>
    remove(key: string): Promise<undefined>
  }
}

export interface CacheOptions {
  undefinedValue?: any,
}
