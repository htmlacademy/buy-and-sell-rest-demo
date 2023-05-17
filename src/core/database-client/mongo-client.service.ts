import { inject, injectable } from 'inversify';
import mongoose, { Mongoose } from 'mongoose';
import { DatabaseClientInterface } from './database-client.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../logger/logger.interface.js';

@injectable()
export default class MongoClientService implements DatabaseClientInterface {
  private isConnected = false;
  private mongooseInstance: Mongoose | null = null;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {}

  private async _connect(uri:string): Promise<void> {
    this.mongooseInstance = await mongoose.connect(uri);
    this.isConnected = true;
  }

  private async _disconnect(): Promise<void> {
    await this.mongooseInstance?.disconnect();
    this.isConnected = false;
    this.mongooseInstance = null;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');
    await this._connect(uri);
    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to the database');
    }

    await this._disconnect();
    this.logger.info('Database connection closed.');
  }
}
