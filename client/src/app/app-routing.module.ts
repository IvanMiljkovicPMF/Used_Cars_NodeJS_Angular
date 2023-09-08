import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NoAuthGuard } from './guards/no-auth-guard.guard';
import { SingleCarComponent } from './pages/single-car/single-car.component';
import { CarsAddsComponent } from './pages/cars-adds/cars-adds.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth-guard.guard';
import { CarsPortalComponent } from './pages/cars-portal/cars-portal.component';
import { EditCarComponent } from './pages/edit-car/edit-car.component';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { UsersPortalComponent } from './pages/users-portal/users-portal.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';


const routes: Routes = [
{
  path:'home',
  component:HomeComponent,
},
{
  path:'contact',
  component:ContactComponent,
},
{
  path:'about',
  component:AboutUsComponent,
},
{
  path:'ads',
  component:CarsAddsComponent,
},
{
  path:'car/:id',
  component:SingleCarComponent,
},
{
  path:'login',
  component:LoginComponent,
  canActivate:[NoAuthGuard]
},
{
  path:'register',
  component:RegisterComponent,
  canActivate:[NoAuthGuard]
},
{
  path:'cars-portal',
  component:CarsPortalComponent,
  canActivate:[AuthGuard, AdminGuard]
},
{
  path:'edit-car/:id',
  component:EditCarComponent,
  canActivate:[AuthGuard, AdminGuard]
},
{
  path:'add-car',
  component:AddCarComponent,
  canActivate:[AuthGuard, AdminGuard]
},
{
  path:'users-portal',
  component:UsersPortalComponent,
  canActivate:[AuthGuard, AdminGuard]
},
{
  path:'edit-user/:id',
  component:EditUserComponent,
  canActivate:[AuthGuard, AdminGuard]
},
{
  path:'add-user',
  component:AddUserComponent,
  canActivate:[AuthGuard, AdminGuard]
},
{
  path:'**',
  redirectTo: 'home'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
