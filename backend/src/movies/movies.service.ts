import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoggingTool } from '../tools/logging/logging.tool';
import * as process from 'node:process';

@Injectable()
export class MoviesService {
  constructor(@Inject(LoggingTool) private readonly loggingTool: LoggingTool) {
    this.loggingTool.setContext(MoviesService.name);
  }

  private key = process.env.TMDB_API_KEY;
  private ROOT_URL = 'https://api.themoviedb.org/3';
  private TRENDING_URL =
    `trending/movie/week?api_key=${this.key}&page=`;

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
