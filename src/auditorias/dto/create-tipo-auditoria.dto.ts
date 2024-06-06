import { IsString } from "class-validator";

export class CreateTipoAuditoriaDto {
    @IsString()
    nombre: string;

}
