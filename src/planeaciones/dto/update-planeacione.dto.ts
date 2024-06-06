import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaneacioneDto } from './create-planeacione.dto';

export class UpdatePlaneacioneDto extends PartialType(CreatePlaneacioneDto) {}
