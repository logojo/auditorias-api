import { IsString } from "class-validator";

export class CreateDependenciaDto {
    @IsString()
    dependencia:string;

    @IsString()
    siglas:string
}
