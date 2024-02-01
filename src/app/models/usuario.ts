export interface Usuario {
    id: number;
    nombre: string;
    userName: string;
    activo: boolean;
    changedPasswordFirstLogin: boolean;
    padre: number | null;
    role: string;
}