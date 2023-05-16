export interface DatabaseClientInterface {
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
}
