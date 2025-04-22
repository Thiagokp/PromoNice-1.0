import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  private api = `${environment.apiUrl}/usuario`;


  listarTodos(): Observable<any> {
    return this.http.get(`${this.api}/listar`);
  }

  consultarPorId(id: number): Observable<any> {
    return this.http.get(`${this.api}/listar-por/${id}`);
  }

  salvar(usuario: any): Observable<any> {
    return this.http.post(`${this.api}/salvar`, usuario);
  }

  alterar(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.api}/alterar/${id}`, usuario);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/deletar/${id}`);
  }
}
