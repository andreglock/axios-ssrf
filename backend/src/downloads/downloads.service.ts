import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoggingTool } from '../tools/logging/logging.tool';
import { Response } from 'express';

@Injectable()
export class DownloadsService {
  constructor(@Inject(LoggingTool) private readonly loggingTool: LoggingTool) {
    this.loggingTool.setContext(DownloadsService.name);
  }

  public getImageOfLinda(filename: string, response: Response): void {
    this.loggingTool.debug(`Intercepting download request for a Linda image`);
    const filePath = './src/downloads/assets/linda/' + filename;
    const authorized = true;
    if (!authorized) {
      this.throwInvalidException('User is not authorized to access the file');
    }
    this.loggingTool.debug(`Linda download ${filePath} granted`);
    return response.download(filePath);
  }

  public getImageOfNick(filename: string, response: Response): void {
    this.loggingTool.debug(`Intercepting download request for a Nick image`);
    const filePath = './src/downloads/assets/nick/' + filename;
    const authorized = true;
    if (!authorized) {
      this.throwInvalidException('User is not authorized to access the file');
    }
    this.loggingTool.debug(`Nicolas Cage download ${filePath} granted`);
    return response.download(filePath);
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
}
