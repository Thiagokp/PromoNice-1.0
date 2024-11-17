import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  mostrarForm: boolean = true;
  loginForm: FormGroup;
  cadastroForm: FormGroup;
  mostrarErroLogin: boolean = false;
  mostrarErroCadastro: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginSenha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.cadastroForm = this.fb.group({
      cadastroNome: ['', Validators.required],
      cadastroEmail: ['', [Validators.required, Validators.email]],
      cadastroSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarCadastroSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  validarLogin() {
    if (this.loginForm.invalid) {
      this.mostrarErroLogin = true;
    } else {
      this.mostrarErroLogin = false;
      console.log('Login realizado com sucesso!', this.loginForm.value);
    }
  }

  validarCadastro() {
    if (this.cadastroForm.invalid) {
      this.mostrarErroCadastro = true;
    } else {
      this.mostrarErroCadastro = false;
      console.log('Cadastro realizado com sucesso!', this.cadastroForm.value);
    }
  }

  mudarForms(): void {
    this.mostrarForm = !this.mostrarForm;
    this.mostrarErroCadastro = false;
    this.mostrarErroLogin = false;
  }
}
