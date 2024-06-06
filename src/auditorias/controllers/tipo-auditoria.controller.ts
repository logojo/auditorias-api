import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';

import { TipoAuditoriasService } from '../services';
import { CreateTipoAuditoriaDto } from '../dto';
import { HandleErrors } from '../../common/decorators/error-handler.decorator';

@Controller('tipo-auditoria')
export class TipoAuditoriaController {

constructor(private readonly TipoAuditoriaservice: TipoAuditoriasService) {}

  @Post()
  @Auth()
  @HandleErrors()
  create( @Body() createTipoAuditoriaDto: CreateTipoAuditoriaDto ) {
    return this.TipoAuditoriaservice.create( createTipoAuditoriaDto )
  }
}
