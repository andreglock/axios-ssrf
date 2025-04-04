import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { join } from 'path';
import { MoviesModule } from './movies/movies.module';import { ToolsModule } from './tools/tools.module';
import { VulnerabilityModule } from './vulnerability/vulnerability.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'frontend/dist/angular/'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MoviesModule,
    VulnerabilityModule,
    ToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
