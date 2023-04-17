import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/_model/Producto';
import { ProductoService } from 'src/app/_service/producto.service';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  dataSource!: MatTableDataSource<Producto>;
  displayedColumns: string[] = ['item', 'producto', 'categoria', 'marca', 'precioBase', 'stock', 'estado', 'accion'];
  @ViewChild(MatPaginator, {static : true} ) paginator! : MatPaginator;

  cantidad! : number;
  
  constructor(private productoService : ProductoService, public dialog : MatDialog, private snackBar : MatSnackBar) { }

  ngOnInit(): void {

    this.productoService.listPageable(0,10).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.cantidad = data.totalElements;
    });

    this.productoService.refresh.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.productoService.snackMessage.subscribe(data => {
      this.snackBar.open(data, "AVISO", {
        duration : 3000
      });
    });
  }


  nextPage(e : any){
    this.productoService.listPageable(e.pageIndex, e.pageSize).subscribe(data =>{
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    })
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openDialog(producto? : Producto){
    let prod = producto!=null ? producto : new Producto();
    this.dialog.open(ProductoDialogComponent, {
      width : '300px',
      data : prod
    });
  }

  deleteProduct(id : number){
    this.productoService.delete(id).subscribe(() => {
      this.productoService.getAll().subscribe(data => {
        this.productoService.refresh.next(data);
        this.productoService.snackMessage.next("PRODUCTO ELIMINADO");
      });
    });
  }


}
