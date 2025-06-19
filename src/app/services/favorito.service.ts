import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/cadastro-produto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  constructor(private http: HttpClient) { }

  favoritarProduto(produtoId: number, usuarioId: number) {
    return this.http.post(`${environment.apiUrl}/favoritos`, {
      usuario: { id: usuarioId },
      produto: { id: produtoId }
    });
  }

  desfavoritarProduto(produtoId: number, usuarioId: number) {
    return this.http.delete(`${environment.apiUrl}/favoritos/${usuarioId}/${produtoId}`);
  }

  getFavoritosDoUsuario(usuarioId: number) {
    return this.http.get<Produto[]>(`${environment.apiUrl}/favoritos/${usuarioId}`);
  }
}
