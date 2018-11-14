import { Dependencia } from "./dependencia";
import { Infractor } from "./infractor";
import { TipoVehiculo } from "./tipoVehiculo";
import { Usuario } from "./usuario";

export class Parte {
    public codigo: number;
    public fecha: Date;
    public lugar: string;
    public dependencia: Dependencia;
    public infractor: Infractor;
    public correo: string;
    public tipoVehiculo: TipoVehiculo;
    public placa: string;
    public usuario: Usuario;
    public descripcion: string;
    public estado: boolean;
    public foto: File;
    

    constructor() {
        this.dependencia = new Dependencia();
        this.infractor = new Infractor();
        this.tipoVehiculo = new TipoVehiculo();
    }
}