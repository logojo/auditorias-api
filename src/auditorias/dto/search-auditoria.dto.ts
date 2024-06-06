import { IsOptional, IsString } from "class-validator";

export class SearchAuditoriaDto {
    @IsString()
    @IsOptional()
    term: string;

}
