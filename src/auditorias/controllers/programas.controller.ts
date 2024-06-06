import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';

import { ProgramasService } from '../services';
import { CreateProgramaDto } from '../dto';
import { HandleErrors } from '../../common/decorators/error-handler.decorator';

@Controller('programas')
export class ProgramasController {

constructor(private readonly programaservice: ProgramasService) {}

  @Post()
  @Auth()
  @HandleErrors()
  create( @Body() createProgramaDto: CreateProgramaDto ) {
    return this.programaservice.create( createProgramaDto )
  }
}
