import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { LoggingTool } from '../tools/logging/logging.tool';
import { DownloadsService } from './downloads.service';
import { DownloadsActions } from './downloads.actions';
import { Response } from 'express';

@Controller('downloads')
export class DownloadsController {
  constructor(
    private readonly downloadsService: DownloadsService,
    @Inject(LoggingTool) private readonly loggingTool: LoggingTool,
  ) {
    this.loggingTool.setContext(DownloadsController.name);
  }

  @Get(DownloadsActions.GET_LINDA_IMAGE + ':filename')
  getImageOfLinda(
    @Param('filename') filename: string,
    @Res() response: Response,
  ) {
    this.loggingTool.debug('DownloadsService.getImageOfLinda');
    return this.downloadsService.getImageOfLinda(filename, response);
  }

  @Get(DownloadsActions.GET_NICK_IMAGE + ':filename')
  getImageOfNick(
    @Param('filename') filename: string,
    @Res() response: Response,
  ) {
    this.loggingTool.debug('DownloadsService.getImageOfNick');
    return this.downloadsService.getImageOfNick(filename, response);
  }
}
