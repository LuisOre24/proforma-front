import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/_model/Producto';
import { ProformaDetalle } from 'src/app/_model/ProformaDetalle';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductoService } from 'src/app/_service/producto.service';
import { ProformaService } from 'src/app/_service/proforma.service';
import { Proforma } from 'src/app/_model/Proforma';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent implements OnInit {

  disabled: boolean = false;

  //nroProforma : number=1;
  cliente!: string;
  documento!: string;
  fecha!: string;
  proformaDetalle: ProformaDetalle[] = [];
  /* proformaDetalle = new Subject<ProformaDetalle[]>(); */

  producto!: Producto;
  total!: number;
  totalGeneral: number = 0;
  cantidad: number = 1;
  precioBase!: number;

  form!: UntypedFormGroup;
  keyword!: string;

  productos: Producto[] = [];

  productoSeleccionado!: Producto;
  filteredProducto!: Observable<any[]>;

  myControlProducto: UntypedFormControl = new UntypedFormControl();

  dataProformaDetalle!: MatTableDataSource<ProformaDetalle>;
  displayedColumns = ['item', 'producto', 'precio', 'precioVenta', 'cantidad', 'total', 'accion'];


  constructor(private productoService: ProductoService,
    private proformaService: ProformaService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.form = new UntypedFormGroup({
      'producto': this.myControlProducto,
      'idProforma': new UntypedFormControl(0),
      'cliente': new UntypedFormControl(''),
      'nomPaciente': new UntypedFormControl(''),
      'documento': new UntypedFormControl('', Validators.pattern(/^[1-9]\d{7,12}$/)),
      'cantidad': new UntypedFormControl(1, [Validators.min(1), Validators.pattern(/^[1-9]/)]),
      'precioVenta': new UntypedFormControl(0),
    });

    this.listarProducto();
    this.filteredProducto = this.myControlProducto.valueChanges.pipe(map(val => this.filter(val)));
    this.productoService.snackMessage.subscribe(data => {
      this.snackBar.open(data, "AVISO", {
        duration: 3000
      });
    });

  }

  listarProducto() {
    this.productoService.getAll().subscribe(data => {
      this.productos = data;
    });

  }

  filter(val: any) {
    if (val != null && val.idProducto > 0) {
      return this.productos.filter(option =>
        option.producto.toLowerCase().includes(val.producto.toLowerCase())
      )
    }
    else {
      return this.productos.filter(option =>
        option.producto.toLowerCase().includes(val.toLowerCase())
      )
    }
  }

  displayFn(val: Producto) {
    return val ? `${val.producto}` : val
  }

  seleccionarProducto(e: any) {
    this.productoSeleccionado = e.option.value;
    this.agregar();
  }

  agregar() {

    if (this.productoSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.proformaDetalle.length; i++) {
        let prod = this.proformaDetalle[i];
        if (prod.producto.idProducto === this.productoSeleccionado.idProducto) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.proformaService.snackMessage.next("EL PRODUCTO YA ESTA EN LISTA");
      }
      else {
        let det = new ProformaDetalle();
        det.cantidad = this.cantidad;
        det.producto = this.productoSeleccionado;
        det.precioBase = this.productoSeleccionado.precioBase;
        det.precioVenta = det.producto.precioBase;
        det.total = det.calcularTotal();
        this.proformaDetalle.push(det);
        this.dataProformaDetalle = new MatTableDataSource(this.proformaDetalle);
        this.totalGeneral += det.precioVenta;
        this.myControlProducto.setValue("");
        this.productoSeleccionado == null;
      }

      this.proformaDetalle.forEach(element => {
        if(element.producto.stock == 0 || element.cantidad > element.producto.stock){

        }
      });

    }
    else {
      this.proformaService.snackMessage.next("DEBE SELECCIONAR ALGUN PRODUCTO");
    }
  }

  removerProducto(index: number) {
    this.proformaDetalle.splice(index, 1);
    //Actualizando total general al remover un item
    this.totalGeneral = this.calcularGranTotal();
    this.dataProformaDetalle = new MatTableDataSource(this.proformaDetalle);
    this.proformaService.snackMessage.next("PRODUCTO RETIRADO DE LISTA");
  }

  actualizarCantidad(idProducto: number, e: any) {
    let event = e.target.value;
    let cant = Number(event);

    if (cant < 0 || cant == 0) {
      this.snackBar.open("LA CANTIDAD NO PUEDE SER MENOR A CERO O IGUAL A 0", "ALERT", {
        duration: 3000
      });
    }
    else {
      this.proformaDetalle.map((detalle: ProformaDetalle) => {
        if (idProducto === detalle.producto.idProducto) {
          detalle.cantidad = cant;
          detalle.total = detalle.calcularTotal();
          this.totalGeneral = this.calcularGranTotal();
        }
        return detalle
      });
    }
  }

  actualizarPrecio(idProducto: number, e: any) {
    let event = e.target.value;
    let prec = Number(event);

    if (prec < 0 || prec == 0) {
      this.snackBar.open("EL PRECIO NO PUEDE SER MENOR O IGUAL A CERO", "ALERT", {
        duration: 3000
      });
    }
    else {
      this.proformaDetalle = this.proformaDetalle.map((detalle: ProformaDetalle) => {
        if (idProducto === detalle.producto.idProducto) {
          detalle.precioVenta = prec;
          detalle.total = detalle.calcularTotal();
          this.totalGeneral = this.calcularGranTotal();
        }
        return detalle;
      });
    }
  }

  //validar totalGeneral - consola imprimiendo repetidas ocaciones
  calcularGranTotal() {
    let getTotal = 0;
    this.proformaDetalle.forEach((detalle: ProformaDetalle) => {
      getTotal += detalle.total;
    });
    return getTotal;
  }

  aceptar() {
    this.registrarVenta();

  }

  //registrar nueva cotizacion
  registrarVenta() {

    try {
      let proforma = new Proforma();
      proforma.cliente = this.form.value.cliente;
      proforma.documento = this.form.value.documento;
      let localISOTime = moment().format('YYYY-MM-DDTHH:mm:ss.sss');
      proforma.fecha = localISOTime;
      proforma.total = this.totalGeneral;
      proforma.detalleProforma = this.proformaDetalle;
      this.proformaService.register(proforma).subscribe(data => {
        this.descargarPdf(data);
      });
      this.offFields();
      
    }
    catch (error) {
      this.snackBar.open("ERROR AL GENERAR LA PROFORMA", "ERROR", {
        duration: 5000
      });
    }
  }

  offFields() {
    this.form.get('cliente')?.disable();
    this.form.get('documento')?.disable();
    this.form.get('producto')?.disable();
    this.form.get('cantidad')?.disable();
    this.disabled = true;
  }
  onfields() {
    this.form.get('cliente')?.enable();
    this.form.get('documento')?.enable();
    this.form.get('producto')?.enable();
    this.form.get('cantidad')?.enable();
    this.disabled = false;
  }


  cancelar() {
    this.clearControls();
  }

  //limpiar formulario luego de generar la proforma
  clearControls() {

    this.form = new UntypedFormGroup({
      'producto': this.myControlProducto,
      'idProforma': new UntypedFormControl(0),
      'cliente': new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      'documento': new UntypedFormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      'cantidad': new UntypedFormControl(1),
      'precioVenta': new UntypedFormControl(0)
    });
    this.proformaDetalle = [];
    this.dataProformaDetalle = new MatTableDataSource(this.proformaDetalle);
    this.producto == null;
    this.total = 0;
    this.totalGeneral = 0;
    this.cantidad = 1;
    this.productoSeleccionado == null;

    this.onfields();
  }

  /* descargarPdf(proforma: any) {
    console.log(proforma);
    console.log(proforma.idProforma);
    this.proformaService.exportarpdf(proforma).subscribe(data => {
      console.log(data);
      const url = window.URL.createObjectURL(data);
      console.log(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      a.href = url;
      a.download = `proforma-${proforma.idProforma}.pdf`;
      a.click();
    })
  } */


  descargarPdf(proforma: any) {

    this.proformaService.exportarpdf(proforma).subscribe((data: Blob) => {
      let file = new Blob([data], {type : 'application/pdf'})
      const url = URL.createObjectURL(file);
      //window.open(url);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      a.href = url;
      a.download = `proforma-${proforma.idProforma}.pdf`;
      a.click();
    });
  }


}
