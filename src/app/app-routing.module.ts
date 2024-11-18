import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'cadastro-usuario', component: CadastroUsuarioComponent},
  {path: 'cadastro-produto', component: CadastroProdutoComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
