import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  getEnvironmentUrl() {
    return environment.url;
  }
}
