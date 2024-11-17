import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  mostrarForm: boolean = true;

  mudarForms(): void {
    this.mostrarForm = !this.mostrarForm;
  }
}
