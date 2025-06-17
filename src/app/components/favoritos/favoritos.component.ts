import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/cadastro-produto.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  faHeart = faHeart;

  produtos: Produto[] = [];

  constructor(
      private produtoService: ProdutoService,
      private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.listarProdutos(); // Carrega os produtos ao iniciar a página
  }

  listarProdutos(): void {
    this.produtoService.listarTodosProdutos().subscribe({
      next: (res) => {
        console.log('Produtos carregados:', res);
        this.produtos = res;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      },
    });
  }

  abrirPromocao(url: string): void {
    if (url) {
      window.open(url, '_blank'); // Abre em uma nova aba
    } else {
      this.toastr.warning('URL não disponível.', 'Atenção');
    }
  }

  toggleFavorito(produto: Produto) {
    produto.favorito = !produto.favorito;
  }

}
