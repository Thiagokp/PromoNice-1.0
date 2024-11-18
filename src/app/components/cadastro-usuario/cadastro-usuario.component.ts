import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  mostrarForm: boolean = true;
  cadastroForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  mudarForms(): void {
    this.mostrarForm = !this.mostrarForm;
  }

  passwordMatchValidator(group: FormGroup): void {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    if (senha !== confirmarSenha) {
      group.get('confirmarSenha')?.setErrors({ mismatch: true });
    }
  }

  salvarUsuario(): void {
    if (this.cadastroForm.valid) {
      const { nome, email, senha } = this.cadastroForm.value;
      this.usuarioService.salvar({ nome, email, senha }).subscribe(
        (response) => {
          this.toastr.success('Usuário salvo com sucesso!')
          this.mudarForms();
        },
      );
    } else {
      console.log('Formulário inválido');
    }
  }
}
