import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getMovies(): Promise<string> {
    return this.moviesService.getMovies();
  }

  @Get(':page')
  getTrendingMoviesByPage(@Param('page') page: string) {
    return this.moviesService.getTrendingMoviesByPage(page);
  }
}
