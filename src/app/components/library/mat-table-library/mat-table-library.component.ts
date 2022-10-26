import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { IProdBook } from 'src/app/interfaces/iprod-book';
import { IProdMusic } from 'src/app/interfaces/iprod-music';
import { IProdVideogame } from 'src/app/interfaces/iprod-videogame';
import { AuthService } from 'src/app/services/auth.service';
import { ShopsystemService } from 'src/app/services/shopsystem.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-mat-table-library',
  templateUrl: './mat-table-library.component.html',
  styleUrls: ['./mat-table-library.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MatTableLibraryComponent implements OnInit, AfterViewInit, OnChanges {

  getId: number | undefined = this.authService.getId();
  libraryProducts: any[] = [];
  showSpinner: boolean = false;
  error = undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['productType', 'title', 'paymentMethod', 'download'];
  dataSource: MatTableDataSource<IProdVideogame | IProdMusic | IProdBook> = new MatTableDataSource(this.libraryProducts);
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: IProdVideogame | IProdMusic | IProdBook | null;

  headers: {
    Authorization?: string;
    "Content-Type": string
  } = { "Content-Type": "application/json" };
  options = { headers: this.headers }

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private shopService: ShopsystemService) { }

  ngOnInit(): void {
    // eseguire prima il get dei prodotti e poi new MatTableDataSource
    this.getLibraryListByShopId(this.getId);
    this.dataSource = new MatTableDataSource(this.libraryProducts);
    this.showSpinner = true;

    setTimeout(() => {
      this.showSpinner = false;
      this.dataSource = new MatTableDataSource(this.libraryProducts);
    }, 300);
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.libraryProducts);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      },
      (err) => {
        console.log("Il server e' ripartito, per eseguire il get faccio il reload della pagina");
        location.reload();
        this.error = err.error;
        console.log(err.error);
      }
    )
  }



}
