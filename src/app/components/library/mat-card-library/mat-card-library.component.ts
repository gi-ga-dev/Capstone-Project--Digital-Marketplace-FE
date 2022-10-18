import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';

@Component({
  selector: 'app-mat-card-library',
  templateUrl: './mat-card-library.component.html',
  styleUrls: ['./mat-card-library.component.scss']
})
export class MatCardLibraryComponent implements OnInit {

  error = undefined;
  libraryProducts: any[] = [];
  getId: number | undefined = this.authService.getId();

  constructor(
    private authService: AuthService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void { this.getLibraryListByShopId(this.getId); }

  getLibraryListByShopId(shopId: number | undefined) {
    return this.shopService.getLibraryListByShopId(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        this.libraryProducts = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}