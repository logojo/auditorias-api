import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EjecucionService } from './ejecucion.service';
import { CreateEjecucionDto } from './dto/create-ejecucion.dto';
import { UpdateEjecucionDto } from './dto/update-ejecucion.dto';
import { SkipStepDto } from './dto/skip-step.dto';
import { HandleErrors } from 'src/common/decorators/error-handler.decorator';

@Controller('ejecucion')
export class EjecucionController {
  constructor(private readonly ejecucionService: EjecucionService) {}

  @Post()
  create(@Body() createEjecucionDto: CreateEjecucionDto) {
    return this.ejecucionService.create(createEjecucionDto);
  }

  @Post('skip-step')
  @HandleErrors()
  skipStep( @Body() skipStepDto: SkipStepDto ) {
    return this.ejecucionService.skipStep( skipStepDto );
  }


  @Get()
  findAll() {
    return this.ejecucionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ejecucionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEjecucionDto: UpdateEjecucionDto) {
    return this.ejecucionService.update(+id, updateEjecucionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ejecucionService.remove(+id);
  }
}
