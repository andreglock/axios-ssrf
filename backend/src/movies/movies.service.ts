import { Inject, Injectable, Logger, UsePipes } from '@nestjs/common';
import axios from 'axios';
import { LoggingTool } from '../tools/logging/logging.tool';

@Injectable()
export class MoviesService {
  constructor(@Inject(LoggingTool) private readonly loggingTool: LoggingTool) {
    this.loggingTool.setContext(MoviesService.name);
  }

  private ROOT_URL = 'https://api.themoviedb.org/3';
  private TRENDING_URL =
    'trending/movie/week?api_key=8c20094b9d32bd14049b323d7d8294d0&search=';

  private internalAPIClient = axios.create({
    baseURL: this.ROOT_URL,
  });

  async getMovies(): Promise<string> {
    this.loggingTool.log(`Getting movies without page`);

    return (await this.internalAPIClient.get(
      `${this.TRENDING_URL}`,
    )).data;
  }

  async getTrendingMoviesByPage(page: string) {
    this.loggingTool.log(`Getting movies by page: ${page}`);

    return (
      await this.internalAPIClient.get(
        `${this.TRENDING_URL}${page}`,
      )
    ).data;
  }
}
