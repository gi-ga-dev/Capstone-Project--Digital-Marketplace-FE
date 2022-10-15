import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginPage } from './components/auth/login/login.page';
import { SignupPage } from './components/auth/signup/signup.page';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  { path: 'products', canActivate: [AuthGuard], loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule) },
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'library', canActivate: [AuthGuard], loadChildren: () => import('./components/library/library.module').then(m => m.LibraryModule) },
  { path: 'purchase-history', canActivate: [AuthGuard], loadChildren: () => import('./components/purchase-history/purchase-history.module').then(m => m.PurchaseHistoryModule) },
  { path: 'shopping-cart', canActivate: [AuthGuard], loadChildren: () => import('./components/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) },
  { path: 'wishlist', canActivate: [AuthGuard], loadChildren: () => import('./components/wishlist/wishlist.module').then(m => m.WishlistModule) },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', loadChildren: () => import('./components/error404/error404.module').then(m => m.Error404Module) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
