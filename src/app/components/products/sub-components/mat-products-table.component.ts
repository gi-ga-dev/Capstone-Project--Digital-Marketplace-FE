import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IProdVideogame } from 'src/app/interfaces/iprod-videogame';

@Component({
  selector: 'app-mat-products-table',
  templateUrl: './mat-products-table.component.html',
  styleUrls: ['./mat-products-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class MatProductsTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('f') form!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['title', 'platform', 'developer', 'publisher', 'releaseDate', 'genre'];
  products: IProdVideogame[] = [];
  dataSource: MatTableDataSource<IProdVideogame> = new MatTableDataSource(this.products);
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: IProdVideogame | null;
  error = undefined;
  productId!: number;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) { this.dataSource.paginator.firstPage(); }
  }

}
