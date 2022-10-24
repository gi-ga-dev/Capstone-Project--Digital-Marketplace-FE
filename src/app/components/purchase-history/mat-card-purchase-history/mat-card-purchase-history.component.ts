import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';

@Component({
  selector: 'app-mat-card-purchase-history',
  templateUrl: './mat-card-purchase-history.component.html',
  styleUrls: ['./mat-card-purchase-history.component.scss']
})
export class MatCardPurchaseHistoryComponent implements OnInit {

  error = undefined;
  historyProducts: any[] = [];
  getId: number | undefined = this.authService.getId();
  showSpinner: boolean = false;
  showString: boolean = false;

  constructor(
    private authService: AuthService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void {
    // spinner e get dopo 0,3 sec
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.getHistoryListByShopId(this.getId);
    }, 300);

    // dopo 0,4 sec mostrato contenuto emptyblock
    setTimeout(() => {
      this.showString = true;
    }, 400);
  }

  getHistoryListByShopId(shopId: number | undefined) {
    return this.shopService.getHistoryListByShopId(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        this.historyProducts = resp;
      },
      (err) => {
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

}
