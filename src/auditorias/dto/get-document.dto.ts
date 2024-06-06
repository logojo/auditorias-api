import { IsUUID, IsInt, IsEnum } from 'class-validator';
import { Etapa, TipoAuditoria } from '../interfaces/auditorias.interface';


export class GetDocumentDto {
    @IsInt()
    step: number;

    @IsEnum(Etapa)
    etapa: Etapa;

    @IsUUID()
    auditoriaId: string

    @IsEnum(TipoAuditoria)
    tipo: TipoAuditoria

}
