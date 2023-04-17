import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Atencion } from 'src/app/_model/Atencion';
import { AtencionService } from 'src/app/_service/atencion.service';
import { RegistroAtencionComponent } from './registro-atencion/registro-atencion.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RegistroPagoComponent } from './registro-pago/registro-pago.component';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AtencionComponent implements OnInit {


  dataSource! : MatTableDataSource<Atencion>;
  displayedColumns : string[] = ["id", "cliente", "documento", "fecha", "estadoAtencion", "estadoPago", "total","accion"];
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement!: Atencion | null;
  @ViewChild(MatPaginator, {static : true})
  paginator! : MatPaginator;
  cantidad! : number;

  constructor(private atencionService : AtencionService,private dialog : MatDialog) { }

  ngOnInit(): void {
    this.atencionService.listPageable(0,10).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.paginator = this.paginator;
      this.cantidad = data.totalElements;
    })

    this.atencionService.refresh.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    

  }


  applyFilter(event : Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  nextPage(e : any){
    this.atencionService.listPageable(e.pageIndex, e.pageSize).subscribe(data =>{
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
    });
  }

  openDialog(){

    this.dialog.open(
      RegistroAtencionComponent ,{
        width : '70%'
      }
    )

  }

  registrarPagoDialog(data? : Atencion){
    this.dialog.open(RegistroPagoComponent, {
      width : '700px',
      data : data
    });
  }

}
