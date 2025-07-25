import { ProdutoFilterService } from './../../services/produto-filter.service';
import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { FavoritoService } from '../../services/favorito.service';
import {
  faThumbsDown,
  faThumbsUp,
  faTrash,
  faPencil,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Produto } from '../../models/cadastro-produto.model';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrash;
  faPencil = faPencil;
  faHeart = faHeart;
  faHeartRegular = faHeartRegular;
  usuarioLogado: any = null;
  produtos: Produto[] = [];// Array para armazenar os produtos
  termoBusca: string = '';
  filtroSubscription!: Subscription;

  isEditando: boolean = false; // Controle para exibir o formulário de edição
  produtoEditado: any = {
    nome: '',
    descricao: '',
    promocoes: [{ preco: 0, urlPromocao: '' }],
  }; // Produto que está sendo editado

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private produtoFilterService: ProdutoFilterService,
    private favoritoService: FavoritoService
  ) {}

  ngOnInit(): void {
      const usuarioString = localStorage.getItem('usuario');
      this.usuarioLogado = usuarioString ? JSON.parse(usuarioString) : null;

     this.filtroSubscription = this.produtoFilterService.termoBusca$.subscribe(termo => {
      this.termoBusca = termo;
      this.filtrarProdutos();
    });

    if (this.produtoEditado?.promocoes[0]?.preco !== undefined) {
      const preco = Number(this.produtoEditado.promocoes[0].preco).toFixed(2);
      // Converte para string com vírgula como separador decimal
      this.produtoEditado.promocoes[0].preco = preco.replace('.', ',');
    }
    this.listarProdutos(); // Carrega os produtos ao iniciar a página
  }

   ngOnDestroy() {
    this.filtroSubscription.unsubscribe();
  }

listarProdutos(): void {
  const usuarioString = localStorage.getItem('usuario');
  const usuario = usuarioString ? JSON.parse(usuarioString) : null;

  if (usuario && usuario.id) {
    // Usuário logado - carrega produtos com favoritos
    this.produtoService.getProdutosComFavoritos(usuario.id).subscribe({
      next: (res) => {
        this.produtos = res;
      }
    });
  } else {
    // Usuário não logado - carrega todos os produtos
    this.produtoService.listarTodosProdutos().subscribe({
      next: (res) => {
        this.produtos = res;
      },
      error: () => {
        this.toastr.error('Erro ao carregar produtos');
      }
    });
  }
}

   filtrarProdutos() {
      if (!this.termoBusca || this.termoBusca.trim() === '') {
        this.listarProdutos();
      } else {
        this.produtoService.buscarProdutosPorNome(this.termoBusca).subscribe({
          next: (res) => {
            this.produtos = res;

            if (this.produtos.length === 0) {
              this.toastr.warning('Nenhum produto encontrado com esse nome.', 'Busca');
            }
          },
          error: (err) => {
            console.error('Erro ao buscar produtos:', err);
            this.toastr.error('Erro ao buscar produtos.', 'Erro');
          },
        });
      }
    }

  editarProduto(produto: Produto): void {
    console.log('Produto para edição:', produto);
    console.log('isEditando:', this.isEditando);
    this.produtoEditado = { ...produto }; // Clona o produto para evitar alterações diretas
    this.isEditando = true; // Ativa o formulário de edição
    setTimeout(() => {  //rola para o topo da pagina
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
  }

salvarProduto(): void {
  if (!this.produtoEditado?.id) return;

  if (
    !this.produtoEditado.promocoes ||
    this.produtoEditado.promocoes.length === 0
  ) {
    this.produtoEditado.promocoes = [{ preco: 0, urlPromocao: '' }];
  }

  // Pega o usuário logado do localStorage
  const usuario = localStorage.getItem('usuario');
  if (!usuario) {
    this.toastr.error('Usuário não logado!', 'Erro');
    return;
  }
  const usuarioObj = JSON.parse(usuario);
  const usuarioId = usuarioObj.id;

  this.produtoService
    .alterarProduto(this.produtoEditado.id, this.produtoEditado, usuarioId)
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
        if (err.status === 403) {
          this.toastr.error('Você não tem permissão para alterar esse produto.', 'Acesso negado');
        } else {
          this.toastr.error('Erro ao alterar o produto', 'Erro');
        }
        console.error('Erro ao alterar o produto:', err);
      },
    });
}

  // Método para cancelar a edição
  cancelarEdicao(): void {
    this.isEditando = false; // Desativa o formulário de edição
  }

excluirProduto(id: number): void {
  const confirmacao = window.confirm(
    'Você tem certeza que deseja excluir essa promoção?'
  );

  if (confirmacao) {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (!usuario.id) {
      this.toastr.error('Usuário não encontrado. Faça login novamente.', 'Erro');
      return;
    }

    this.produtoService.deletarProduto(id, usuario.id).subscribe({
      next: () => {
        this.toastr.success('Produto deletado com sucesso', 'Sucesso');
        this.listarProdutos();
      },
      error: (err) => {
        console.error('Erro ao excluir o produto:', err);
        this.toastr.error('Erro ao excluir o produto', 'Erro');
      },
    });
  }
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

  formatarPreco(valor: any): string {
    if (valor == null || valor === '') return '';

    const numero = Number(valor.toString().replace(/\D/g, '')) / 100;
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  atualizarPrecoEditar(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valor = input.value;

    const valorNumerico = parseFloat(
      valor.replace(/[R$\s.]/g, '').replace(',', '.')
    );
    this.produtoEditado.promocoes[0].preco = isNaN(valorNumerico) ? 0 : valorNumerico;
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
