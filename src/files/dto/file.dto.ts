import { IsEnum, IsString } from "class-validator";
import { Etapa, TipoAuditoria } from "../../auditorias/interfaces/auditorias.interface";

export class FileDto {
    
    @IsString()
    dependencia:string;

    @IsString()
    folio:string;

    @IsEnum(TipoAuditoria)
    tipo:TipoAuditoria;

    @IsEnum(Etapa)
    etapa:Etapa;

    @IsString()
    step:string;
}
