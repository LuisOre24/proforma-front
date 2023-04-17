import { Cliente } from "./Cliente";
import { DetallePago } from "./DetallePago";

export class Atencion{

    idAtencion! : number;
    cliente! : Cliente;
    fechaAtencion! : string;
    fechaEntrega! : string;
    detalleAtencion! : string;
    detalleEntrega! : string;
    costoAtencion! : number;
    estadoAtencion! : number;
    estadoCancelacion! : number;
    detallePago! : DetallePago[]

}