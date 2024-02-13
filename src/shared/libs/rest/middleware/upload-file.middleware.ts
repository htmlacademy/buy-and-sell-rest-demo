import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import * as crypto from 'node:crypto';
import { Middleware } from './middleware.interface.js';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtention = extension(file.mimetype);
        const filename = crypto.randomUUID();
        callback(null, `${filename}.${fileExtention}`);
      }
    });

    const uploadSingleFileMiddleware = multer({ storage })
      .single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
