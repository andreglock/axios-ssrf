import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';
import { LoggingTool } from '../tools/logging/logging.tool';
import * as console from 'node:console';

@Injectable()
export class DownloadsAccessMiddleware implements NestMiddleware {
  constructor(@Inject(LoggingTool) private loggingTool: LoggingTool) {
    this.loggingTool.setContext(DownloadsAccessMiddleware.name);
  }

  async use(req: Request, res: Response) {
    if (!req.baseUrl || !req.params.param?.length) {
      this.throwInvalidException(
        `Intercepting download: could not read download file parameters`,
      );
    }

    const baseUrl = req.baseUrl;
    const params = req.params.param;

    let folderName: string | undefined;
    let fileName: string;

    if (params.length > 1) {
      console.log('Multiple params detected:', params);
      folderName = params[0];
      fileName = params[1];
    } else {
      console.log('Single param detected:', params);
      fileName = params[0];
    }

    const path = folderName ? `${folderName}/${fileName}` : fileName;

    this.loggingTool.debug(
      `Intercepting call to ${baseUrl} and download path ${path}`,
    );

    if (DownloadsAccessMiddleware.isNickDownload(baseUrl)) {
      this.loggingTool.debug(
        `Intercepting download request for a Nicolas Cage image`,
      );
      const filePath = './src/downloads/assets/' + path;
      console.log('Nick filePath:', filePath);
      const authorized = true;
      if (!authorized) {
        this.throwInvalidException(
          'User is not authorized to access Nicolas Cage files',
        );
      }
      this.loggingTool.debug(`Nicolas Cage download ${filePath} granted`);
      return res.download(filePath);
    }

    if (DownloadsAccessMiddleware.isLindaDownload(baseUrl)) {
      this.loggingTool.debug(`Intercepting download request for a Linda image`);
      const filePath = './src/downloads/assets/' + path;
      const authorized = true;
      if (!authorized) {
        this.throwInvalidException('User is not authorized to access the file');
      }
      this.loggingTool.debug(`Linda download ${filePath} granted`);
      // provide download
      console.log('Linda filePath:', filePath);
      return res.download(filePath);
    }

    this.throwInvalidException(
      `Intercepting unknown download request  - deny access`,
    );
  }

  private throwInvalidException(errorMessage: string): void {
    this.loggingTool.warn(errorMessage);
    throw new HttpException(
      {
        code: 'NOT_AUTHORIZED_TO_ACCESS_FILE',
        message: 'User is not authorized to access the file',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  private static isNickDownload(url: string): boolean {
    console.log('Checking if Nick download for url:', url);
    return url
      .replace(/[^a-zA-Z]/g, '')
      .startsWith(
        path.join('api', `/downloads/nick`).replace(/[^a-zA-Z]/g, ''),
      );
  }

  private static isLindaDownload(url: string): boolean {
    return url
      .replace(/[^a-zA-Z]/g, '')
      .startsWith(
        path.join('api', `/downloads/linda`).replace(/[^a-zA-Z]/g, ''),
      );
  }
}
