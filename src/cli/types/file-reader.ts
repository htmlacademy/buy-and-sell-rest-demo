export interface FileReader<T>{
  filename: string;
  read(): void;
  toArray(): T;
}
