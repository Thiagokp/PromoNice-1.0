import { Component } from '@angular/core';
import { faSearch, faThumbsDown, faThumbsUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importar FontAwesomeModule
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { ModalConfiguracaoComponent } from './modal-configuracao/modal-configuracao.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, MatDialogModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  faSearch = faSearch;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faPlus = faPlus

  constructor(private dialog: MatDialog) {}

  abrirModal(): void {
    this.dialog.open(ModalConfiguracaoComponent, {
      width: '700px',
      height: '500px',
    });
  }

  onSearch() {
    const searchInput = (document.querySelector('.search-input') as HTMLInputElement).value;
    console.log('Buscando por:', searchInput);
    // Aqui você pode adicionar lógica para realizar a busca
  }
}
