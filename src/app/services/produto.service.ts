import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/cadastro-produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  private api = 'http://localhost:8080/api/produtos';

  listarTodosProdutos(): Observable<any> {
    return this.http.get(`${this.api}/listar-todos`);
  }

  consultarProdutoPorId(id: number): Observable<any> {
    return this.http.get(`${this.api}/listar-por/${id}`);
  }

  cadastrarProduto(id: number, produto: any): Observable<any> {
    return this.http.post(`${this.api}/cadastrar/${id}`, produto);
  }

  alterarProduto(id: number, produto: Produto): Observable<any> {
    return this.http.put(`${this.api}/alterar/${id}`, produto);
  }

  deletarProduto(id: number): Observable<any> {
    return this.http.delete(`${this.api}/deletar/${id}`);
  }
}
