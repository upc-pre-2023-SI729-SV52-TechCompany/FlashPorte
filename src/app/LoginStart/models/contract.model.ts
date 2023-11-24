export interface Contract {
    clientId: number;
    companyId: number;
    nombre: string;
    foto: string;
    nombreServicio: string;
    fechaHoy: string;
    servicios: string;
    direccionEntrega: string;
    direccionDestino: string;
    fechaServicio: string;
    horaServicio: string;
    numeroTarjeta: string;
    cvvTarjeta: string;
    vencimientoTarjeta: string;
    id: number;
    estado: string;
    rejectedPermanent: boolean;
    costoServicio: number;
    aceptado?: boolean;
    estadoPermanente?: boolean;
}
