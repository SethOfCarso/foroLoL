import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ApiLolService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getLolInfoByUsername(username): Observable<any>  {
    return this.http.get(this.getEnvironmentUrl() + '/api/lol/' + username);
  }
}
