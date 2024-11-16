import { Component } from '@angular/core';
import { faSearch, faThumbsDown, faThumbsUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Importar FontAwesomeModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule], // Adicione o módulo aqui
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  faSearch = faSearch;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faPlus = faPlus
  
  onSearch() {
    const searchInput = (document.querySelector('.search-input') as HTMLInputElement).value;
    console.log('Buscando por:', searchInput);
    // Aqui você pode adicionar lógica para realizar a busca
  }
}
