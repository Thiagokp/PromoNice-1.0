import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import {
  faThumbsDown,
  faThumbsUp,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../../models/cadastro-produto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrash;

  produtos: Produto[] = []; // Array para armazenar os produtos

  isEditando: boolean = false; // Controle para exibir o formulário de edição
  produtoEditado: any = { nome: '', descricao: '', promocoes: [{ preco: 0, urlPromocao: '' }] }; // Produto que está sendo editado

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService
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

  editarProduto(produto: Produto): void {
    console.log('Produto para edição:', produto);
    console.log('isEditando:', this.isEditando);
    this.produtoEditado = { ...produto }; // Clona o produto para evitar alterações diretas
    this.isEditando = true; // Ativa o formulário de edição
  }

  salvarProduto(): void {
    if (!this.produtoEditado?.id) return;

    if (
      !this.produtoEditado.promocoes ||
      this.produtoEditado.promocoes.length === 0
    ) {
      this.produtoEditado.promocoes = [{ preco: 0, urlPromocao: ''  }];
    }

    this.produtoService
      .alterarProduto(this.produtoEditado.id, this.produtoEditado)
      .subscribe({
        next: () => {
          this.toastr.success('Produto alterado com sucesso!', 'Sucesso');

          // Atualiza o produto no array 'produtos'
          const index = this.produtos.findIndex(
            (prod) => prod.id === this.produtoEditado.id
          );
          if (index !== -1) {
            this.produtos[index] = { ...this.produtoEditado };
          }

          this.isEditando = false; // Fecha o formulário de edição
          //this.produtoEditado = null; // Reseta o produto editado
        },
        error: (err) => {
          console.error('Erro ao alterar o produto:', err);
          this.toastr.error('Erro ao alterar o produto', 'Erro');
        },
      });
  }

  // Método para cancelar a edição
  cancelarEdicao(): void {
    this.isEditando = false; // Desativa o formulário de edição
  }

  excluirProduto(id: number): void {
    this.produtoService.deletarProduto(id).subscribe({
      next: (res) => {
        this.toastr.success('Produto deletado com sucesso', 'Sucesso');
        this.listarProdutos(); // Atualiza a lista de produtos após a exclusão
      },
      error: (err) => {
        console.error('Erro ao excluir o produto:', err);
        this.toastr.error('Erro ao excluir o produto', 'Erro');
      },
    });
  }

  buscarProdutoPorId(id: number) {
    this.produtoService.consultarProdutoPorId(id).subscribe({
      next: (res) => {
        this.produtoEditado = res.id;
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
}
