import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(this.api, { email, senha });
  }
}
