import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';

import { DependenciasService } from '../services/dependencias.service';
import { CreateDependenciaDto } from '../dto/create-dependencia';
import { HandleErrors } from 'src/common/decorators/error-handler.decorator';

@Controller('dependencias')
export class DependenciasController {

constructor(private readonly dependenciaService: DependenciasService) {}

  @Post()
  @Auth()
  @HandleErrors()
  create( @Body() createDependenciaDto: CreateDependenciaDto ) {
    return this.dependenciaService.create( createDependenciaDto )
  }
}
