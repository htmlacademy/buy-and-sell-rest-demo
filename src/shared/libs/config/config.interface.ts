export interface Config<U> {
  get<T extends keyof U>(key: T): U[T];
}
