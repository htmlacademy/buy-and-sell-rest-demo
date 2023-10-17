export interface DocumentExists {
  exists(documentId: string): Promise<boolean>;
}
