export interface Contract {
    clientId: any;
    companyId: any;
    nombre: any;
    foto: any;
    nombreServicio: any;
    fechaHoy: any;
    servicios: any;
    direccionEntrega: any;
    direccionDestino: any;
    fechaServicio: any;
    horaServicio: any;
    numeroTarjeta: any;
    cvvTarjeta: any;
    vencimientoTarjeta: any;
    id: any;
    estado: string;
    rejectedPermanent: boolean;
    costoServicio: number;
    costoDelServicio: number;
    aceptado?: boolean;
    estadoPermanente?: boolean;
}
