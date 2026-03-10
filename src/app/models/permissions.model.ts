export interface MenuPermisosResponse {
    permissions: string[];
    username: string;
    planDescripcion: string;
    evaluatedAt: string;
}

export interface RuleContext {
    personaNumero: number;
    username: string;
    nombre: string;
    apellido: string;
    esTitular: boolean;
    planDescripcion: string;
    planCodigo: string;
    planGrillaTipo: string;
    credencialDigital: string;
    parentescoCodigo: number;
    linea: string;
    estadoCuenta: string;
    fechaActual: string;
    horaActual: string;
    esDiaHabil: boolean;
    grupoFamiliar: MiembroFamiliar[];
    campaniaVacunacionActiva: boolean;
    campaniaCompartiSaludActiva: boolean;
    tieneAsistenciaViajero: boolean;
    estadoPMI: string;
    tieneAltaIntegrante: boolean;
}

export interface MiembroFamiliar {
    id: number;
    sexo: string;
    fechaNacimiento: string;
    discapacidad: string;
    lecheMedicamentosaActiva: boolean;
}
