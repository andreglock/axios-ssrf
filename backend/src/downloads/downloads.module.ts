import { Module } from '@nestjs/common';
import { DownloadsService } from './downloads.service';
import { DownloadsController } from './downloads.controller';

@Module({
  providers: [DownloadsService],
  controllers: [DownloadsController],
})
export class DownloadsModule {}
