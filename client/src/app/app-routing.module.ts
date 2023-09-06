import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';


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
  path:'login',
  component:LoginComponent,
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
