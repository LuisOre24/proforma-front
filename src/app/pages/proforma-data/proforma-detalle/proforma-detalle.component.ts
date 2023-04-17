import { Component, Inject, OnInit } from '@angular/core';
import { Proforma } from 'src/app/_model/Proforma';
import { ProformaDataComponent } from '../proforma-data.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-proforma-detalle',
  templateUrl: './proforma-detalle.component.html',
  styleUrls: ['./proforma-detalle.component.css']
})
export class ProformaDetalleComponent implements OnInit {


  proforma! : Proforma;

  constructor(private dialogRef : MatDialogRef<ProformaDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Proforma) { }

  ngOnInit(): void {
    this.proforma = new Proforma();
    this.proforma.idProforma = this.data.idProforma;
    this.proforma.cliente = this.data.cliente;
    this.proforma.documento = this.data.documento;
    this.proforma.fecha = this.data.fecha;
    this.proforma.detalleProforma = this.data.detalleProforma;
    this.proforma.total = this.data.total;
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


  aceptar(){
    this.dialogRef.close();
  }

}
