import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CarsAddsComponent } from './pages/cars-adds/cars-adds.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import{HttpClientModule}from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { SingleCarComponent } from './pages/single-car/single-car.component';
import { MenuModule } from 'primeng/menu';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import { CarsPortalComponent } from './pages/cars-portal/cars-portal.component';
import { EditCarComponent } from './pages/edit-car/edit-car.component';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { UsersPortalComponent } from './pages/users-portal/users-portal.component';
import { ScrollTopModule } from 'primeng/scrolltop';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    CarsAddsComponent,
    NavbarComponent,
    FooterComponent,
    SingleCarComponent,
    CarsPortalComponent,
    EditCarComponent,
    AddCarComponent,
    AddUserComponent,
    EditUserComponent,
    UsersPortalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    CardModule,
    InputTextModule,
    MenuModule,
    AppRoutingModule,
    ButtonModule,
    SliderModule,
    TableModule,
    PaginatorModule,
    InputNumberModule,
    ReactiveFormsModule,
    PanelModule,
    ScrollTopModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
