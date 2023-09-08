import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { CarsAddsComponent } from './pages/cars-adds/cars-adds.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import{HttpClientModule}from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'; // Import CardModule
import { PaginatorModule } from 'primeng/paginator';
import { SingleCarComponent } from './pages/single-car/single-car.component';

import { MenuModule } from 'primeng/menu';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';



import { CarsPortalComponent } from './pages/cars-portal/cars-portal.component';
import { EditCarComponent } from './pages/edit-car/edit-car.component';
import { AddCarComponent } from './pages/add-car/add-car.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    CarsAddsComponent,
    NavbarComponent,
    FooterComponent,
    SingleCarComponent,
    CarsPortalComponent,
    EditCarComponent,
    AddCarComponent
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
    PaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
