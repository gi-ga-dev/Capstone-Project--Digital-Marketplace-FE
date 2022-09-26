import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './components/auth/login/login.page';
import { SignupPage } from './components/auth/signup/signup.page';

const routes: Routes = [
  {
    path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'login', component: LoginPage
  },
  {
    path: 'signup', component: SignupPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
