import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';

import { EjerciciosService } from '../services';
import { CreateEjercicioDto } from '../dto';
import { HandleErrors } from '../../common/decorators/error-handler.decorator';

@Controller('ejercicios')
export class EjerciciosController {

constructor(private readonly ejercicioservice: EjerciciosService) {}

  @Post()
  @Auth()
  @HandleErrors()
  create( @Body() createEjercicioDto: CreateEjercicioDto ) {
    return this.ejercicioservice.create( createEjercicioDto )
  }
}
