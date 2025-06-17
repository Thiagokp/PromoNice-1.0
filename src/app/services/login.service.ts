import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private api = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(this.api, { email, senha });
  }

  isUsuarioLogado(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  getUsuarioLogado(): any {
    return JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }
}
