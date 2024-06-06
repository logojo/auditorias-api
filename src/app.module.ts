import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { AuditoriasModule } from './auditorias/auditorias.module';
import { CommonModule } from './common/common.module';
import { PlaneacionesModule } from './planeaciones/planeaciones.module';
import { FilesModule } from './files/files.module';
import { EjecucionModule } from './ejecucion/ejecucion.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}), // con esto me ahorro el tener que importar el ConfigModule en cada modulo
    TypeOrmModule.forRoot({
      type             : 'mysql',
      host             : process.env.DB_HOST,
      port             : +process.env.DB_PORT,
      database         : process.env.DB_NAME,
      username         : process.env.DB_USERNAME,
      password         : process.env.DB_PASSWORD,
      autoLoadEntities : true,
      synchronize      : true
    }),
    CommonModule,
    AuthModule,
    SeedModule,
    AuditoriasModule,
    FilesModule,
    PlaneacionesModule,
    EjecucionModule
  ]
})
export class AppModule {}
