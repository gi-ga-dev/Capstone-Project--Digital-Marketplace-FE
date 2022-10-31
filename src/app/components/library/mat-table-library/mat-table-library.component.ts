import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IProdBook } from 'src/app/interfaces/iprod-book';
import { IProdMusic } from 'src/app/interfaces/iprod-music';
import { IProdVideogame } from 'src/app/interfaces/iprod-videogame';
import { AuthService } from 'src/app/services/auth.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatModalCodeComponent } from '../mat-modal-code/mat-modal-code.component';

@Component({
  selector: 'app-mat-table-library',
  templateUrl: './mat-table-library.component.html',
  styleUrls: ['./mat-table-library.component.scss'],

  // Risolto un bug (conflitto tra sort ed expandable) documentazione ufficiale errata
  // Fonte: https://github.com/angular/components/issues/13431
  animations: [
    trigger('detailExpand', [state('collapsed, void', style({ height: '0px' })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ]
})
export class MatTableLibraryComponent implements OnInit {

  getId: number | undefined = this.authService.getId();
  isSubscribed: boolean | undefined = this.authService.getIsSubscribed();
  libraryProducts: any[] = [];
  showSpinner: boolean = false;
  error = undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['productType', 'title', 'paymentMethod', 'releaseDate', 'genre'];
  dataSource: MatTableDataSource<IProdVideogame | IProdMusic | IProdBook> = new MatTableDataSource(this.libraryProducts);
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: IProdVideogame | IProdMusic | IProdBook | null;

  headers: {
    Authorization?: string;
    "Content-Type": string
  } = { "Content-Type": "application/json" };
  options = { headers: this.headers }

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private authService: AuthService,
    private shopService: ShopsystemService,
    private prodService: ProductsService) { }

  ngOnInit(): void {
    this.showSpinner = true;

    setTimeout(() => {
      this.showSpinner = false;
      this.getLibraryListByShopId(this.getId);
    }, 300);
  }

  openCodeDialog(prodId: number | undefined) {
    // prendo id (dai prodotti ciclati in html passo id nel paramentro di questo metodo) e lo inietto nel modal purchase
    const dialogRef = this.dialog.open(MatModalCodeComponent, {
      panelClass: 'code-dialog-cont',
      data: { id: prodId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage(); }
  }

  getLibraryListByShopId(shopId: number | undefined) {
    return this.shopService.getLibraryListByShopId(shopId).subscribe(
      (resp) => {
        this.error = undefined;
        this.libraryProducts = resp;
        // Fai il get dei dati, dopodiche' costruisce Table con Paginator e Sort
        this.dataSource = new MatTableDataSource(this.libraryProducts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log("Il server e' ripartito, per eseguire il get faccio il reload della pagina");
        location.reload();
        this.error = err.error;
        console.log(err.error);
      }
    )
  }

  /*   saveCode() {
      return this.prodService.saveCode(product.)
    } */



}
