import { Component, Inject, OnInit } from '@angular/core';
import { Categoria } from 'src/app/_model/Categoria';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { CategoriaComponent } from '../categoria.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-dialog',
  templateUrl: './categoria-dialog.component.html',
  styleUrls: ['./categoria-dialog.component.css']
})
export class CategoriaDialogComponent implements OnInit {

  categoria! : Categoria

  constructor(private categoriaService : CategoriaService,
    public dialogRef : MatDialogRef<CategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Categoria) { }

  ngOnInit(): void {
    this.categoria = new Categoria();
    this.categoria.idCategoria = this.data.idCategoria;
    this.categoria.categoria = this.data.categoria;
    this.categoria.estado = this.data.estado;
  }

  save(){

    if(!this.categoria==null){
      this.categoriaService.update(this.categoria).subscribe(() =>{
        this.categoriaService.getAll().subscribe(data =>{
          this.categoriaService.refresh.next(data);
          this.categoriaService.snackMessage.next("CATEGORIA ACTUALIZADA");
        });
      });
    }
    else{
      this.categoriaService.register(this.categoria).subscribe(() =>{
        this.categoriaService.getAll().subscribe(data =>{
          this.categoriaService.refresh.next(data);
          this.categoriaService.snackMessage.next("CATEGORIA REGISTRADA");
        });
      });
    }
    
    this.dialogRef.close();
  }

  cancel(){
    this.dialogRef.close();
  }

}
