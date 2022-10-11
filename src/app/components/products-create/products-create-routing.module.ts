import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsCreateComponent } from './products-create.component';

const routes: Routes = [{ path: '', component: ProductsCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsCreateRoutingModule { }
