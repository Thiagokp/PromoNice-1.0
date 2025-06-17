import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'cadastro-produto', component: CadastroProdutoComponent, canActivate: [AuthGuard] },
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: 'favoritos', component: FavoritosComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
