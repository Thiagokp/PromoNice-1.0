import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/cadastro-produto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  private api = `${environment.apiUrl}/produtos`;

  listarTodosProdutos(): Observable<any> {
    return this.http.get(`${this.api}/listar-todos`);
  }

  consultarProdutoPorId(id: number): Observable<any> {
    return this.http.get(`${this.api}/listar-por/${id}`);
  }

  cadastrarProduto(id: number, produto: any): Observable<any> {
    return this.http.post(`${this.api}/cadastrar/${id}`, produto);
  }

 alterarProduto(id: number, produto: Produto, usuarioId: number): Observable<any> {
  return this.http.put(`${this.api}/alterar/${id}`, produto, {
    headers: { 'usuario-id': usuarioId.toString() }
  });
}

  deletarProduto(id: number, usuarioId: number): Observable<any> {
    const headers = {
      'usuario-id': usuarioId.toString(),
    };

    return this.http.delete(`${this.api}/deletar/${id}`, { headers });
  }

    buscarProdutosPorNome(filtro: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.api}/buscar?filtro=${encodeURIComponent(filtro)}`);
  }

}
