import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AuditoriasService } from '../services/auditorias.service';
import { CreateAuditoriaDto, UpdateAuditoriaDto, SearchAuditoriaDto } from '../dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { HandleErrors } from '../../common/decorators/error-handler.decorator';


@Controller('auditorias')
export class AuditoriasController {
  constructor(private readonly auditoriasService: AuditoriasService) {}

  @Post()
  @Auth()
  @HandleErrors()
  create(
    @Body() createAuditoriaDto: CreateAuditoriaDto,
    @GetUser() user : User
  ) {
    return this.auditoriasService.create(createAuditoriaDto, user);
  }

  @Get()
  @Auth()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe ) page : number = 1, 
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe ) limit : number = 1, 
  ) {
    const paginationsDto : IPaginationOptions = {
      limit,
      page,
      route: 'http://localhost:3000/api/auditorias',
    }
    return this.auditoriasService.findAll( paginationsDto );
  }

  @Post('search')
  @Auth()
  search(
    @Body() term: SearchAuditoriaDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe ) page : number = 1, 
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe ) limit : number = 1, 
  ) {
    const paginationsDto : IPaginationOptions = {
      limit,
      page,
    }
    return this.auditoriasService.search( term, paginationsDto,  );
  }

  @Get('catalogos')
  @Auth()
  getCatalogos(){
    return this.auditoriasService.getCatalogos();
  }


  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.auditoriasService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateAuditoriaDto: UpdateAuditoriaDto
  ) {
    return this.auditoriasService.update(id, updateAuditoriaDto);
  }

  @Delete(':id')
  @Auth()
  @HandleErrors()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.auditoriasService.remove(id);
  }
}
