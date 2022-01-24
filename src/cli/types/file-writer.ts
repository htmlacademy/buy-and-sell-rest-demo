export interface FileWriter<T> {
  readonly filename: string;
  write(data: T): void;
}
