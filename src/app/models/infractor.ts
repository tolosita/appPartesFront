import { TipoDocumento } from "./tipoDocumento";
import { Grado } from "./grado";

export class Infractor {
    public codigo: number;
    public identificacion: number;
    public grado: Grado;
    public nombre: string;
    public apellidos: string;
    public tipoDocumento: TipoDocumento;

    constructor() {
        this.grado = new Grado();
        this.tipoDocumento = new TipoDocumento();
    }
}