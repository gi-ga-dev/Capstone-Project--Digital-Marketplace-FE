import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.page';
import { AudiobooksComponent } from './sub-pages/audiobooks.page';
import { MusicComponent } from './sub-pages/music.page';
import { VideogamesComponent } from './sub-pages/videogames.page';

const routes: Routes = [{
  path: '', component: ProductsComponent,
  children:
    [
      { path: 'videogames', component: VideogamesComponent },
      { path: 'music', component: MusicComponent },
      { path: 'audiobooks', component: AudiobooksComponent }
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
