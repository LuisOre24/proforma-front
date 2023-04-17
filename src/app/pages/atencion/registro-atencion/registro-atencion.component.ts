import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Atencion } from 'src/app/_model/Atencion';
import { Cliente } from 'src/app/_model/Cliente';
import { ClienteService } from 'src/app/_service/cliente.service';
import * as moment from 'moment';
import { AtencionService } from 'src/app/_service/atencion.service';
import { DetallePago } from 'src/app/_model/DetallePago';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-registro-atencion',
  templateUrl: './registro-atencion.component.html',
  styleUrls: ['./registro-atencion.component.css']
})
export class RegistroAtencionComponent implements OnInit {

  isChecked: boolean = false;

  cliente!: Cliente;
  atencion!: Atencion;
  detPago: DetallePago[] = [];

  nombre!: string;
  apellido!: string;
  documento!: string;
  telefono!: string;
  email!: string;
  direccion!: string;
  detalleAtencion!: string;

  formCliente!: FormGroup;

  costoServicio: number = 0.00;
  // 
  constructor(private clienteService: ClienteService, private atencionService: AtencionService, private snackBar: MatSnackBar, private dialogRef : MatDialogRef<RegistroAtencionComponent>) {

  }

  ngOnInit(): void {
    this.formCliente = new FormGroup({
      'idCliente': new FormControl(0),
      'nombreCliente': new FormControl(''),
      'apellidoCliente': new FormControl(''),
      'documentoCliente': new FormControl(''),
      'telefonoCliente': new FormControl(''),
      'emailCliente': new FormControl(''),
      'direccionCliente': new FormControl(''),
      'detalleAtencion': new FormControl(''),
      'costoServicio': new FormControl('0')
    });
  }


  registrarCliente() {

    try {
      let cliente = new Cliente();
      cliente.documento = this.formCliente.value.documentoCliente;
      cliente.nombre = this.formCliente.value.nombreCliente;
      cliente.apellido = this.formCliente.value.apellidoCliente;
      cliente.telefono = this.formCliente.value.telefonoCliente;
      cliente.correo = this.formCliente.value.emailCliente;
      cliente.direccion = this.formCliente.value.direccionCliente;
      this.clienteService.registrar(cliente).subscribe(() => { });
    }
    catch {
      
    }


  }

  validarDocumento() {
    let document: string = this.formCliente.value.documentoCliente;

    this.clienteService.getCliente(document).subscribe(data => {
      if (data != null) {
        this.cliente = data;
        this.formCliente = new FormGroup({
          'documentoCliente': new FormControl(data.documento),
          'nombreCliente': new FormControl(data.nombre),
          'apellidoCliente': new FormControl(data.apellido),
          'telefonoCliente': new FormControl(data.telefono),
          'emailCliente': new FormControl(data.correo),
          'direccionCliente': new FormControl(data.direccion),
          'detalleAtencion': new FormControl(''),
          'costoServicio': new FormControl(0.00)
        });
      }
      else {
        this.snackBar.open(
          "Cliente no registrado", "Aviso", {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
        )
      }
    });
  }


  registrarAtencion() {

    try {

      this.clienteService.getCliente(this.formCliente.value.documentoCliente).subscribe(data => {

        if (data != null || data != undefined) {
          this.cliente = data;
          ///////
          var fechaAtencionActual = moment().format('YYYY-MM-DDTHH:mm:ss.sss');
          let atencion = new Atencion();
          this.cliente.documento = this.formCliente.value.documentoCliente;
          this.cliente.nombre = this.formCliente.value.nombreCliente;
          this.cliente.apellido = this.formCliente.value.apellidoCliente;
          this.cliente.telefono = this.formCliente.value.telefonoCliente;
          this.cliente.correo = this.formCliente.value.emailCliente;
          this.cliente.direccion = this.formCliente.value.direccionCliente;
          atencion.cliente = this.cliente;
          this.clienteService.update(this.cliente).subscribe(() => { });
          atencion.detalleAtencion = this.formCliente.value.detalleAtencion;
          atencion.costoAtencion = this.formCliente.value.costoServicio;
          if (this.isChecked) {
            let detail = new DetallePago();
            detail.montoPago = this.formCliente.value.costoServicio;
            detail.fechaDetPago = fechaAtencionActual;
            this.detPago.push(detail);
            atencion.estadoCancelacion = 1;
            atencion.costoAtencion = this.formCliente.value.costoServicio;
            atencion.detallePago = this.detPago;
          }
          else {

            let detail = new DetallePago();
            detail.montoPago = this.formCliente.value.costoServicio;
            detail.fechaDetPago = fechaAtencionActual;
            this.detPago.push(detail);
            atencion.fechaAtencion = fechaAtencionActual;
            atencion.estadoAtencion = 0;
            atencion.estadoCancelacion = 0;
            atencion.costoAtencion = 0;
            atencion.detallePago = this.detPago;
          }
          
          this.atencionService.register(atencion).subscribe(() => { });

        }
        else {

          this.registrarCliente();
          this.clienteService.getCliente(this.formCliente.value.documentoCliente).subscribe(data => {
            let client = data;
            let atention = new Atencion();
            atention.cliente = client;
            var fechaAtencionActual = moment().format('YYYY-MM-DDTHH:mm:ss.sss');
            atention.fechaAtencion = fechaAtencionActual;
            atention.detalleAtencion = this.formCliente.value.detalleAtencion;
            if (this.isChecked) {
              let detail = new DetallePago();
              detail.montoPago = this.formCliente.value.costoServicio;
              detail.fechaDetPago = fechaAtencionActual;
              this.detPago.push(detail);
              atention.estadoAtencion = 0;
              atention.estadoCancelacion = 1;
              atention.costoAtencion = this.formCliente.value.costoServicio;
              atention.detallePago = this.detPago;
            }
            else {

              let detail = new DetallePago();
              detail.montoPago = this.formCliente.value.costoServicio;
              detail.fechaDetPago = fechaAtencionActual;
              this.detPago.push(detail);
              atention.fechaAtencion = fechaAtencionActual;
              atention.estadoAtencion = 0;
              atention.estadoCancelacion = 0;
              atention.costoAtencion = 0;
              atention.detallePago = this.detPago;
            }
            this.atencionService.register(atention).subscribe(() => { });
          });

        }

      });



    }
    catch (error) {

    }

    this.dialogRef.close()
   
  }


}
