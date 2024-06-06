import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuditoriasModule } from 'src/auditorias/auditorias.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [
    //ConfigModule,
    AuthModule,
    AuditoriasModule,
    CommonModule
  ]
})
export class FilesModule {}
