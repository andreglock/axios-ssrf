import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://api.themoviedb.org/3'
  }

  get(url:string) {
    return this.http.get(`${this.ROOT_URL}/${url}`);
  }

}
