import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlaneacionesService } from './planeaciones.service';
import { PlaneacionesController } from './planeaciones.controller';
import { Planeacion } from './entities/planeacion.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuditoriasModule } from 'src/auditorias/auditorias.module';

@Module({
  controllers: [PlaneacionesController],
  providers: [PlaneacionesService],
  imports:[
    TypeOrmModule.forFeature([
      Planeacion
    ]),
    CommonModule,
    AuthModule,
    AuditoriasModule 
  ]
})
export class PlaneacionesModule {}
