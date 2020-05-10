import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  uploadImage(formData): Observable<any> {
    const headers = new HttpHeaders({
      'x-auth': this.authService.getToken()
    });
    const options = { headers };
    return this.http.post(environment.url + '/api/upload/image', formData, options);
  }

  getEnvironmentUrl() {
    return environment.url;
  }
}
