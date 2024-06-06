import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuditoriasService, DependenciasService, DocumentsService, EjerciciosService, ProgramasService, TipoAuditoriasService } from './services';
import { AuditoriasController, DependenciasController, DocumentsController, EjerciciosController, ProgramasController, TipoAuditoriaController } from './controllers';
import { AuthModule } from 'src/auth/auth.module';
import { Dependencia, Auditoria, Ejercicio, Programa, TipoAuditoria } from './entities';
import { CommonModule } from '../common/common.module';
import { Document } from './entities/documents.entity';

@Module({
  controllers: [ 
    AuditoriasController, 
    DependenciasController, 
    DocumentsController,
    EjerciciosController,
    ProgramasController,
    TipoAuditoriaController,
  ],
  providers: [ 
    AuditoriasService, 
    DependenciasService,
    DocumentsService, 
    EjerciciosService,
    ProgramasService,
    TipoAuditoriasService,
    Logger
  ],
  imports:[ 
    TypeOrmModule.forFeature([
      Dependencia,
      Ejercicio,
      Programa,
      TipoAuditoria,
      Auditoria,
      Document
    ]),
    CommonModule,
    AuthModule 
  ],
  exports:[ 
    TypeOrmModule,
    AuditoriasService,
    DocumentsService
  ]
})
export class AuditoriasModule {}
