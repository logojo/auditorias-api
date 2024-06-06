import { IsInt, IsPositive, IsUUID } from "class-validator"


export class SkipStepDto {

@IsUUID()
id: string

@IsInt()
@IsPositive()
step: number
}