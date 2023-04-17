import { Component, OnInit, ViewChild } from '@angular/core';
import { Proforma } from 'src/app/_model/Proforma';
import { ProformaService } from 'src/app/_service/proforma.service';
import { ProformaDetalleComponent } from './proforma-detalle/proforma-detalle.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-proforma-data',
  templateUrl: './proforma-data.component.html',
  styleUrls: ['./proforma-data.component.css']
})
export class ProformaDataComponent implements OnInit {

  dataSource! : MatTableDataSource<Proforma>;
  displayedColumns: string[] = ['item', 'nroProforma', 'fecha', 'cliente', 'documento', 'total', 'accion'];
  @ViewChild(MatPaginator, {static : true} ) paginator! : MatPaginator;

  cantidad! : number;

  constructor(private proformaService : ProformaService, private dialog : MatDialog, private snackBar : MatSnackBar) { }

  ngOnInit(): void {

    this.proformaService.listPageable(0,10).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.cantidad = data.totalElements;
    });

    this.proformaService.refresh.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.proformaService.snackMessage.subscribe(data => {
      this.snackBar.open(data, "aviso", {
        duration : 3000
      });
    });

  }

  nextPage(e : any){
    this.proformaService.listPageable(e.pageIndex, e.pageSize).subscribe(data =>{
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    })
  }

  detalleProforma(proforma : Proforma){
    this.dialog.open(
      ProformaDetalleComponent,{
        width : '70%',
        data : proforma
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /* descargarPdf(proforma: Proforma){
    this.proformaService.exportarpdf(proforma).subscribe(data =>{
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      a.href = url;
      a.download = `proforma-${proforma.idProforma}.pdf`;
      
      a.click();
    })
  } */
  
  descargarPdf(proforma: any) {

    this.proformaService.exportarpdf(proforma).subscribe((data: Blob) => {
      const file = new Blob([data], {type : 'application/pdf'})
      let url = URL.createObjectURL(file);
      //window.open(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      a.href = url;
      a.download = `proforma-${proforma.idProforma}.pdf`;
      a.click();
    });
  }


  eliminarProforma(id : number){
    this.proformaService.delete(id).subscribe(() => {
      this.proformaService.getAll().subscribe(data  => {
        this.proformaService.refresh.next(data);
        this.proformaService.snackMessage.next("PROFORMA ELIMINADA");
      })
    })
  }

  agregarCeros(id : number){
    if(id < 10){
      return `00000000${id}`
    }
    else if(id < 100){
      return `0000000${id}`
    }
    else if(id < 1000){
      return `000000${id}`
    }
    else if(id < 10000){
      return `00000${id}`
    }
    else{
      return `0000${id}`
    }
  }

}
