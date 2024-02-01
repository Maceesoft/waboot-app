import { Usuario } from "./usuario";

export interface AuthData {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    tokenType: string;
    user: Usuario;
}