import { Injectable } from '@angular/core';
import { WebRequestService } from './services/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  getMovies(title: string) {
    return this.webRequestService.get(title);
  }
}
