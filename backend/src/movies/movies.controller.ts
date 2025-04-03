import { Controller, Get, Inject, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { LoggingTool } from '../tools/logging/logging.tool';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService, @Inject(LoggingTool) private readonly loggingTool: LoggingTool) {
    this.loggingTool.setContext(MoviesController.name);
  }
  @Get()
  getMovies(): Promise<string> {
    return this.moviesService.getMovies();
  }

  @Get(':page')
  getTrendingMoviesByPage(@Param('page') page: string) {
    return this.moviesService.getTrendingMoviesByPage(page);
  }
}
