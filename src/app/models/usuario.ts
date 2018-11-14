export class Usuario {
    public codigo: number;
    public identificacion: number;
    public nombre: string;
    public apellidos: string;
    public usuario: string;
    public clave: string;
    public correo: string;
    public tipo: boolean;
    public estado: boolean;
    public recordar: boolean;

    constructor() {
        this.recordar = false;
    }
}
