import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marca } from 'src/app/_model/Marca';
import { MarcaService } from 'src/app/_service/marca.service';

@Component({
  selector: 'app-marca-dialog',
  templateUrl: './marca-dialog.component.html',
  styleUrls: ['./marca-dialog.component.css']
})
export class MarcaDialogComponent implements OnInit {

 marca! : Marca;

  constructor(private marcaService : MarcaService,
    public dialogRef : MatDialogRef<MarcaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marca) { }

  ngOnInit() {
    this.marca = new Marca();
    this.marca.idMarca = this.data.idMarca;
    this.marca.marca = this.data.marca;
    this.marca.estado = this.data.estado;
  }

save(){
  if(!this.marca==null){
    this.marcaService.update(this.marca).subscribe(()=>{
      this.marcaService.getAll().subscribe(data =>{
        this.marcaService.refresh.next(data);
        this.marcaService.snackMessage.next("MARCA ACTUALIZADA");
      });
    });
  }
  else{
    this.marcaService.register(this.marca).subscribe(()=>{
      this.marcaService.getAll().subscribe(data =>{
        this.marcaService.refresh.next(data);
        this.marcaService.snackMessage.next("MARCA REGISTRADA");
      });
    });
  }
  
  this.dialogRef.close();
}

cancel(){
  this.dialogRef.close();
}


}
