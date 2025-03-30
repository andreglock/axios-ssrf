import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebRequestService {
  readonly ROOT_URL;
  readonly API_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://api.themoviedb.org/3';
    this.API_URL = 'http://localhost:3000/api';
  }

  get(url: string) {
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }

  getFromApi(path: string) {
    return this.http.get(`${this.API_URL}/${path}`);
  }
}
