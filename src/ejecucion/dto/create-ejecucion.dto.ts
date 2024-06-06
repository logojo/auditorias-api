import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUUID } from "class-validator";
import { Oficio } from "src/auditorias/interfaces/documents.interface";

export class CreateEjecucionDto {

    @IsOptional()
    @IsString()
    prorroga: string
    
    @IsOptional()
    @IsString()
    plazo: string

    @IsOptional()
    @IsString()
    folio: string;

    @IsOptional()
    @IsString()
    fecha_inicio: string;

    @IsString()
    @IsOptional()
    fecha_termino: string;

    @IsString()
    @IsOptional()
    nombre_representacion:string;

    @IsString()
    @IsOptional()
    nombre_enlace:string

    @IsString()
    @IsOptional()
    cargo_enlace:string

    @IsString()
    @IsOptional()
    descripcion:string;

    
    @IsOptional()
    @IsEnum(Oficio)
    tipo_oficio:Oficio;

    @IsInt()
    step: number

    @IsString()
    archivo: string;
    
    @IsInt()
    total: number;

    @IsUUID()
    auditoriaId: string

}
