import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiLolService {

  constructor(private http: HttpClient) { }

  getLolInfoByUsername(username): Observable<any>  {
    return this.http.get(environment.url + '/api/lol/' + username);
  }
}
