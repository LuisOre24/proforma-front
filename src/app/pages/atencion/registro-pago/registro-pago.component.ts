import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Atencion } from 'src/app/_model/Atencion';
import { AtencionService } from 'src/app/_service/atencion.service';
import * as moment from 'moment';
import { DetallePago } from 'src/app/_model/DetallePago';

@Component({
  selector: 'app-registro-pago',
  templateUrl: './registro-pago.component.html',
  styleUrls: ['./registro-pago.component.css']
})
export class RegistroPagoComponent implements OnInit{


  atencion! : Atencion;
  descripcion! : string;

  constructor(private atencionService : AtencionService, 
    public dialogRef : MatDialogRef<RegistroPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Atencion){}
  
  ngOnInit() {
    this.atencion = new Atencion();
    this.atencion.idAtencion = this.data.idAtencion;
    this.atencion.cliente = this.data.cliente;
    this.atencion.detalleAtencion = this.data.detalleAtencion;
    this.atencion.detalleEntrega = this.data.detalleEntrega;
    this.atencion.fechaAtencion = this.data.fechaAtencion;
    this.atencion.fechaEntrega = this.data.fechaEntrega;
    this.atencion.costoAtencion = this.data.costoAtencion;
    this.atencion.estadoAtencion = this.data.estadoAtencion;
    this.atencion.estadoCancelacion = this.data.estadoCancelacion;
    this.atencion.costoAtencion = this.data.costoAtencion;
    this.atencion.detallePago = this.data.detallePago;
  }
  

  save(){
    var fechaAtencionActual = moment().format('YYYY-MM-DDTHH:mm:ss.sss');
    this.atencion.idAtencion = this.data.idAtencion;
    this.atencion.cliente = this.data.cliente;
    this.atencion.detalleAtencion = this.data.detalleAtencion;
    this.atencion.detalleEntrega = this.atencion.detalleEntrega;
    this.atencion.fechaAtencion = this.data.fechaAtencion;
    this.atencion.fechaEntrega = fechaAtencionActual;
    this.atencion.costoAtencion = this.atencion.costoAtencion;
    this.atencion.estadoAtencion = 1;
    this.atencion.estadoCancelacion = 1;
    let detail = new DetallePago();
    
    detail.idDetPago = this.atencion.idAtencion;
    detail.montoPago = this.atencion.costoAtencion;
    detail.fechaDetPago = fechaAtencionActual;
    detail.descripcion = this.descripcion;
    this.atencion.detallePago.push(detail);
    console.log(this.atencion);

    this.atencionService.update(this.atencion).subscribe( () => {});
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

}
