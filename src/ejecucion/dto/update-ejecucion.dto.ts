import { PartialType } from '@nestjs/mapped-types';
import { CreateEjecucionDto } from './create-ejecucion.dto';

export class UpdateEjecucionDto extends PartialType(CreateEjecucionDto) {}
