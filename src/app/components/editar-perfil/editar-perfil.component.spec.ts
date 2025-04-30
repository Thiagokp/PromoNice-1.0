import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

import { EditarPerfilComponent } from './editar-perfil.component';
import { UsuarioService } from '../../services/usuario.service';

describe('EditarPerfilComponent', () => {
  let component: EditarPerfilComponent;
  let fixture: ComponentFixture<EditarPerfilComponent>;
  let userService: jasmine.SpyObj<UsuarioService>;

  beforeEach(waitForAsync(() => {
    const usuarioServiceSpy = jasmine.createSpyObj('UsuarioService', [
      'consultarPorId',
      'alterar',
    ]);

    TestBed.configureTestingModule({
      declarations: [EditarPerfilComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [{ provide: UsuarioService, useValue: usuarioServiceSpy }],
    }).compileComponents();

    userService = TestBed.inject(
      UsuarioService
    ) as jasmine.SpyObj<UsuarioService>;
    userService.consultarPorId.and.returnValue(
      of({ nome: 'Teste', email: 'teste@teste.com' })
    );

    fixture = TestBed.createComponent(EditarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form deve ser inicializado com valores do serviço', () => {
    expect(component.editarForm.get('nome')?.value).toBe('Teste');
    expect(component.editarForm.get('email')?.value).toBe('teste@teste.com');
  });

  it('deve detectar senhas diferentes', () => {
    component.editarForm.get('senha')?.setValue('123456');
    component.editarForm.get('confirmarSenha')?.setValue('654321');
    component.passwordMatchValidator(component.editarForm);
    expect(
      component.editarForm.get('confirmarSenha')?.hasError('mismatch')
    ).toBeTrue();
  });

  it('deve chamar atualizar() se o formulário estiver válido', () => {
    userService.alterar.and.returnValue(of({}));

    component.editarForm.patchValue({
      nome: 'Novo Nome',
      email: 'novo@teste.com',
      senha: 'senha123',
    });

    component.atualizarUsuario();
    expect(userService.alterar).toHaveBeenCalled();
  });

  it('deve detectar senhas diferentes corretamente', () => {
    component.editarForm.get('senha')?.setValue('123456');
    component.editarForm.get('confirmarSenha')?.setValue('654321');
    component.passwordMatchValidator(component.editarForm);
    expect(
      component.editarForm.get('confirmarSenha')?.hasError('mismatch')
    ).toBeTrue();
  });

  it('deve chamar alterar() com os dados corretos', () => {
    userService.alterar.and.returnValue(of({}));

    component.editarForm.patchValue({
      nome: 'Novo Nome',
      email: 'novo@teste.com',
      senha: 'senha123',
      confirmarSenha: 'senha123', // garantir que as senhas correspondem
    });

    component.atualizarUsuario();
    expect(userService.alterar).toHaveBeenCalledWith(7, {
      nome: 'Novo Nome',
      email: 'novo@teste.com',
      novaSenha: 'senha123',
    });
  });
});
