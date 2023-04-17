import { Component, Inject, OnInit } from '@angular/core';
import { Categoria } from 'src/app/_model/Categoria';
import { Marca } from 'src/app/_model/Marca';
import { Producto } from 'src/app/_model/Producto';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { MarcaService } from 'src/app/_service/marca.service';
import { ProductoService } from 'src/app/_service/producto.service';
import { ProductoComponent } from '../producto.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css']
})
export class ProductoDialogComponent implements OnInit {

  producto! : Producto;
  marcas! : Marca[];
  categorias! : Categoria[];

  constructor(private productoService : ProductoService,
  private categoriaService : CategoriaService,
  private marcaService : MarcaService, 
  public dialogRef : MatDialogRef<ProductoComponent>,
  @Inject(MAT_DIALOG_DATA) public data : Producto) { }

  ngOnInit(): void {
    this.getMarcas();
    this.getCategorias();
    this.producto = new Producto();
    this.producto.idProducto = this.data.idProducto;
    this.producto.producto = this.data.producto;
    this.producto.categoria = this.data.categoria;
    this.producto.marca = this.data.marca;
    this.producto.precioBase = this.data.precioBase;
    this.producto.stock = this.data.stock;
    this.producto.estado = this.data.estado;  
  }

  save(){
    if(!this.data == null){
      this.productoService.update(this.producto).subscribe(() => {
        this.productoService.getAll().subscribe(data =>{
          this.productoService.refresh.next(data);
          this.productoService.snackMessage.next("PRODUCTO ACTUALIZADO");

        });
      });
    }
    else{
      this.productoService.register(this.producto).subscribe(() => {
        this.productoService.getAll().subscribe(data =>{
          this.productoService.refresh.next(data);
          this.productoService.snackMessage.next("PRODUCTO REGISTRADO");
        });
      });
    }
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

  getMarcas(){
    this.marcaService.getAll().subscribe(data => {
      this.marcas = data;
    });
  }

  getCategorias(){
    this.categoriaService.getAll().subscribe(data => {
      this.categorias = data;
    });
  }

  compareMarca(obj1 : Marca, obj2 : Marca){
    return obj1 === undefined || obj2 === undefined || obj1 === null || obj2 === null ? false : obj1.idMarca == obj2.idMarca; 
  }

  compareCategoria(obj1 : Categoria, obj2 : Categoria){
    return obj1 === undefined || obj2 === undefined || obj1 === null || obj2 === null ? false : obj1.idCategoria == obj2.idCategoria; 
  }

}
