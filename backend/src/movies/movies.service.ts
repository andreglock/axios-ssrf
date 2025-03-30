import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  constructor() {}

  private ROOT_URL = 'https://api.themoviedb.org/3';
  private TRENDING_URL =
    'trending/movie/week?api_key=8c20094b9d32bd14049b323d7d8294d0&page=';

  async getMovies(): Promise<string> {
    return await axios.get(`${this.ROOT_URL}/${this.TRENDING_URL}`);
  }

  async getTrendingMoviesByPage(page: string) {
    return (await axios.get(`${this.ROOT_URL}/${this.TRENDING_URL}${page}`))
      .data;
  }
}
