import { Component } from '@angular/core';
import {
  faSearch,
  faThumbsDown,
  faThumbsUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importar FontAwesomeModule
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, MatDialogModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faSearch = faSearch;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faPlus = faPlus;

  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private router: Router
  ) {}

  verificarLoginOuRedirecionar(): void {
    if (this.loginService.isUsuarioLogado()) {
      this.router.navigate(['/editar-perfil']);
    } else {
      this.router.navigate(['/cadastro-usuario']);
    }
  }

  verificarLoginNovoProduto(): void {
    if (this.loginService.isUsuarioLogado()) {
      this.router.navigate(['/cadastro-produto']);
    } else {
      this.router.navigate(['/cadastro-usuario']);
    }
  }

  isLogado(): boolean {
    return this.loginService.isUsuarioLogado();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/cadastro-usuario']);
  }

  onSearch() {
    const searchInput = (
      document.querySelector('.search-input') as HTMLInputElement
    ).value;
    console.log('Buscando por:', searchInput);
    // Aqui você pode adicionar lógica para realizar a busca
  }
}
