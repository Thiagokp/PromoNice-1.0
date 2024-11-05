import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'; // Importando HttpClientModule
<<<<<<< HEAD
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
=======
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from "./components/header/header.component";

>>>>>>> dfdb0f55370a8b03a5ff92a5e1ccad993989316f

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HeaderComponent,
    HttpClientModule, // Adicione o HttpClientModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
