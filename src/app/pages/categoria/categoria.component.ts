import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Categoria } from 'src/app/_model/Categoria';
import { CategoriaDialogComponent } from './categoria-dialog/categoria-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  dataSource!: MatTableDataSource<Categoria>;
  displayedColumns: string[] = ['item', 'categoria', 'estado' , 'accion'];
  @ViewChild(MatPaginator, {static : true} ) 
  paginator! : MatPaginator;
  cantidad! : number;

  constructor(private categoriaService : CategoriaService,
    public dialog : MatDialog,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {

    this.categoriaService.listPageable(0,10).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.cantidad = data.totalElements;
    });

    this.categoriaService.refresh.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.categoriaService.snackMessage.subscribe(data =>{
      this.snackBar.open(data, "AVISO", {
        duration : 3000
      });
    });
    
  }
  

  nextPage(e : any){
    this.categoriaService.listPageable(e.pageIndex, e.pageSize).subscribe(data =>{
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  openDialog(categoria? : Categoria){
    let cat = categoria ? categoria != null : new Categoria();
    this.dialog.open(CategoriaDialogComponent, {
      width : '300px',
      data : cat
    });
  }

  delete(id : number){
    this.categoriaService.delete(id).subscribe( () =>{
      this.categoriaService.getAll().subscribe(data =>{
        this.categoriaService.refresh.next(data);
        this.categoriaService.snackMessage.next("Categoria Eliminada");
      });
    });
  }

}
