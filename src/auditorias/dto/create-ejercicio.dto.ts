import { IsInt, IsPositive } from "class-validator";

export class CreateEjercicioDto {
    @IsPositive()
    @IsInt()
    ejercicio: number;

}
