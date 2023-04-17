import { ProformaDetalle } from './ProformaDetalle'

export class Proforma {

    idProforma! : number;
    //nroProforma! : number;
    cliente! : string;
    documento! : string;
    fecha! : string;
    total! : number;
    detalleProforma! : ProformaDetalle[];

}