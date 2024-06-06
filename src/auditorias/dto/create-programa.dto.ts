import { IsString } from "class-validator";

export class CreateProgramaDto {
    @IsString()
    programa: string;

}
