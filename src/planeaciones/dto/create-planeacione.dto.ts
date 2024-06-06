import { IsBoolean, IsDate, IsDecimal, IsEnum, IsInt, IsOptional, IsString, IsUUID } from "class-validator";
import { Alcance, Tipo } from "../interfaces/planeaciones.interface";

export class CreatePlaneacioneDto {

    @IsOptional()
    @IsDecimal()
    monto: number;

    @IsOptional()
    @IsEnum(Tipo)
    tipo: Tipo;

    @IsEnum(Alcance)
    @IsOptional()
    alcance: Alcance;

    @IsOptional()
    @IsDecimal()
    importe: number;

    @IsOptional()
    @IsDecimal()
    porcentaje: number;

    @IsOptional()
    @IsString()
    asisteTitular: string;

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

    @IsInt()
    step: number

    @IsString()
    archivo: string;
    
    @IsInt()
    total: number;

    @IsUUID()
    auditoriaId: string
}
