import { Categoria } from "./Categoria";
import { Marca } from "./Marca";

export class Producto {

    idProducto! : number;
    producto! : string;
    categoria! : Categoria;
    marca! : Marca;
    precioBase! : number;
    stock! : number;
    estado! : number;

    /* constructor(idProducto : number, producto : string, 
                categoria : Categoria, marca : Marca, 
                precioBase : number, stock : number, estado : number){
            
            this.idProducto = idProducto;
            this.producto = producto;
            this.categoria = categoria;
            this.marca = marca;
            this.precioBase = precioBase;
            this.stock = stock;
            this.estado = estado;
    } */

}