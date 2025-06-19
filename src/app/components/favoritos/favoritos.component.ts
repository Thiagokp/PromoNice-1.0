import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Produto } from '../../models/cadastro-produto.model';
import { ToastrService } from 'ngx-toastr';
import { FavoritoService } from '../../services/favorito.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  faHeart = faHeart;
  faHeartRegular = faHeartRegular;

  produtos: Produto[] = [];

  constructor(
      private favoritoService: FavoritoService,
      private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
      this.carregarFavoritos()
  }

  abrirPromocao(url: string): void {
    if (url) {
      window.open(url, '_blank'); // Abre em uma nova aba
    } else {
      this.toastr.warning('URL não disponível.', 'Atenção');
    }
  }
  
  carregarFavoritos() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (!usuario.id) return;

    this.favoritoService.getFavoritosDoUsuario(usuario.id).subscribe({
      next: (produtos) => {
        this.produtos = produtos; // mostra só os favoritos
      },
      error: () => {
        this.toastr.error('Erro ao carregar favoritos');
      }
    });
  }

  toggleFavorito(produto: any): void {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  if (!usuario.id) {
    this.toastr.error('Usuário não logado.');
    return;
  }

  if (produto.favorito) {
    this.favoritoService.desfavoritarProduto(produto.id, usuario.id).subscribe({
      next: () => {
        produto.favorito = false;
        this.toastr.success('Produto removido dos favoritos!');
        this.produtos = this.produtos.filter(p => p.id !== produto.id); // Remove da tela
      },
      error: () => {
        this.toastr.error('Erro ao desfavoritar o produto.');
      },
    });
  } else {
    this.favoritoService.favoritarProduto(produto.id, usuario.id).subscribe({
      next: () => {
        produto.favorito = true;
        this.toastr.success('Produto favoritado com sucesso!');
      },
      error: () => {
        this.toastr.error('Erro ao favoritar produto.');
      },
    });
  }
}

}
