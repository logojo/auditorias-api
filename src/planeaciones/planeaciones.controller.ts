import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import { PlaneacionesService } from './planeaciones.service';
import { CreatePlaneacioneDto } from './dto/create-planeacione.dto';
import { UpdatePlaneacioneDto } from './dto/update-planeacione.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';


@Controller('planeaciones')
export class PlaneacionesController {
  constructor( 
    private readonly planeacionesService: PlaneacionesService,
  ) { }

  @Post()
  @Auth()
  create(@Body() createPlaneacioneDto: CreatePlaneacioneDto) {
    return this.planeacionesService.create(createPlaneacioneDto);
  }

  @Get()
  findAll() {
    return this.planeacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe ) id: string) {
    return this.planeacionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaneacioneDto: UpdatePlaneacioneDto) {
    return this.planeacionesService.update(+id, updatePlaneacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planeacionesService.remove(+id);
  }
  
}
