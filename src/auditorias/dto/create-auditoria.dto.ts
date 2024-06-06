import { IsEnum, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { Etapa, Representates } from "../interfaces/auditorias.interface";

export class CreateAuditoriaDto {

    @IsString()
    @MinLength(5)
    folio: string;

    @IsOptional()
    @IsEnum(Representates)
    representantes?: Representates;

    @IsEnum(Etapa)
    @IsOptional()
    etapa?: Etapa;
    
    @IsUUID()
    dependenciaId: string;

    @IsUUID()
    ejercicioId: string;

    @IsUUID()
    programaId: string;

    @IsUUID()
    tipoAuditoriaId: string;
}
