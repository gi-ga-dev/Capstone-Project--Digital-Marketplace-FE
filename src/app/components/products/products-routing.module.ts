import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.page';
import { BooksComponent } from './products-subpages/books.page';
import { MusicComponent } from './products-subpages/music.page';
import { VideogamesComponent } from './products-subpages/videogames.page';

const routes: Routes = [{
  path: '', component: ProductsComponent,
  children:
    [
      { path: 'videogames', component: VideogamesComponent },
      { path: 'music', component: MusicComponent },
      { path: 'books', component: BooksComponent }
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
