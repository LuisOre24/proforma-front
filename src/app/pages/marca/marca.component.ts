import { Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from 'src/app/_model/Marca';
import { MarcaService } from 'src/app/_service/marca.service';
import { MarcaDialogComponent } from '../marca/marca-dialog/marca-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  dataSource!: MatTableDataSource<Marca>;
  displayedColumns: string[] = ['item', 'marca', 'estado' , 'accion'];
  @ViewChild(MatPaginator, {static : true} ) paginator! : MatPaginator;

  cantidad! : number;
  
  
  constructor(private marcaService : MarcaService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {

    this.marcaService.listPageable(0,10).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.cantidad = data.totalElements;
    });

    this.marcaService.refresh.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    });

    this.marcaService.snackMessage.subscribe(data => {
      this.snackBar.open(data , "AVISO" ,{
        duration : 3000
      });
    });
  }

  nextPage(e : any){
    this.marcaService.listPageable(e.pageIndex, e.pageSize).subscribe(data =>{
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    })
  }

  openDialog(marca? : Marca){
    let mar = marca!=null ? marca : new Marca();
    this.dialog.open(MarcaDialogComponent, {
      width : '300px',
      data : mar
    });
  }

 
  delete(id : number){
    this.marcaService.delete(id).subscribe(() =>{
      this.marcaService.getAll().subscribe(data => {
        this.marcaService.refresh.next(data);
        this.marcaService.snackMessage.next("MARCA ELIMINADA");
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}
