import { Logger, Module } from '@nestjs/common';
import { EjecucionService } from './ejecucion.service';
import { EjecucionController } from './ejecucion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejecucion } from './entities/ejecucion.entity';
import { AuditoriasModule } from 'src/auditorias/auditorias.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [EjecucionController],
  providers: [EjecucionService, Logger],
  imports:[
    TypeOrmModule.forFeature([
      Ejecucion
    ]),
    AuditoriasModule,
    CommonModule
  ]
})
export class EjecucionModule {}
