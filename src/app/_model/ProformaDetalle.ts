import { Producto } from './Producto';
import { Proforma } from './Proforma';

export class ProformaDetalle{

    proforma! : Proforma;
    producto! : Producto;
    cantidad : number = 1;
    precioBase! : number
    precioVenta : number = 0;
    total : number = 0;

/*     public calcularTotal():number{
        return this.cantidad * this.producto.precioBase;
    } */

    public calcularTotal():number{
        return this.cantidad * this.precioVenta;
    }

}