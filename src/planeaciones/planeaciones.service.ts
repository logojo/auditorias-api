import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { CreatePlaneacioneDto } from './dto/create-planeacione.dto';
import { UpdatePlaneacioneDto } from './dto/update-planeacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Planeacion } from './entities/planeacion.entity';
import { DataSource, Repository } from 'typeorm';
import { Auditoria, Document } from 'src/auditorias/entities';
import { Etapa, TipoAuditoria } from 'src/auditorias/interfaces/auditorias.interface';
import { CommonHelpers } from 'src/common/helpers/helpers';
import { Acta } from 'src/auditorias/interfaces/documents.interface';
import { DocumentsService } from 'src/auditorias/services';

@Injectable()
export class PlaneacionesService {

  constructor(
    @InjectRepository(Auditoria)
    private readonly auditoriaRepository : Repository<Auditoria>,
    
    @InjectRepository(Planeacion)
    private readonly planeacionRepository : Repository<Planeacion>,

    @InjectRepository(Document)
    private readonly documentRepository : Repository<Document>,

    private readonly dataSource : DataSource,
    private readonly documentService : DocumentsService,
    private readonly helpers : CommonHelpers
  ) {}

  async create(createPlaneacioneDto: CreatePlaneacioneDto) {
      const planeacion = await this.planeacionRepository.findOneBy({ auditoriaId: createPlaneacioneDto.auditoriaId });
      const auditoria = await this.auditoriaRepository.findOneBy({ id: createPlaneacioneDto.auditoriaId }); 
      const tipo_auditoria = auditoria.tipo_auditoria.nombre as TipoAuditoria;
      
      let step: number = 0;

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction()

      if(( !planeacion || createPlaneacioneDto.step >= planeacion.step) && createPlaneacioneDto.step < createPlaneacioneDto.total) {            
            step = createPlaneacioneDto.step + 1;          
      }else {
          step = planeacion.step;
      }
      
     try {
         await  queryRunner.manager.getRepository(Planeacion).upsert([
              { 
                auditoriaId: createPlaneacioneDto.auditoriaId, 
                tipo: createPlaneacioneDto.tipo,
                monto: createPlaneacioneDto.monto,
                alcance: createPlaneacioneDto.alcance ,
                importe: createPlaneacioneDto.importe ,
                porcentaje: createPlaneacioneDto.porcentaje,
                asisteTitular: createPlaneacioneDto.asisteTitular === '1' ? true : false,
                step: step 
              },
             ], ["auditoriaId"])

          const existDoc = await this.documentService.getDocument({
            auditoriaId: createPlaneacioneDto.auditoriaId,
            step: createPlaneacioneDto.step,
            tipo: tipo_auditoria,
            etapa: Etapa.Planeación
          });
          
          
          const doc = {
            etapa: Etapa.Planeación,
            folio: createPlaneacioneDto.folio,
            fecha_inicio:  createPlaneacioneDto.fecha_inicio,
            fecha_termino:  createPlaneacioneDto.fecha_termino,
            nombre_representacion:  createPlaneacioneDto.nombre_representacion,
            nombre_enlace:  createPlaneacioneDto.nombre_enlace,
            cargo_enlace:  createPlaneacioneDto.cargo_enlace,
            tipo_doc: this.helpers.getDocument(createPlaneacioneDto.step, tipo_auditoria ),   
            acta:  this.helpers.getActa(createPlaneacioneDto.step, tipo_auditoria, Etapa.Planeación ),            
            categoria:  this.helpers.getCategoria(createPlaneacioneDto.step, tipo_auditoria ),    
            archivo:  createPlaneacioneDto.archivo,
            auditoriaId: createPlaneacioneDto.auditoriaId     
          }

          if( existDoc ) {   
            await queryRunner.manager.update(Document, { id: existDoc.id }, { ...doc })     
          } else{            
            const document = this.documentRepository.create(doc)
            await queryRunner.manager.save( document )
          }

          if( createPlaneacioneDto.step === 1 )
              await queryRunner.manager.update(Auditoria, { id: createPlaneacioneDto.auditoriaId }, { etapa:Etapa.Planeación })
          else if( createPlaneacioneDto.step === createPlaneacioneDto.total )
              await queryRunner.manager.update(Auditoria, { id: createPlaneacioneDto.auditoriaId }, { etapa:Etapa.Planeación, status: true  })

          await queryRunner.commitTransaction();
          await queryRunner.release();
      
    } catch (error) {         
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.helpers.handleExceptions( error );
    }
    
      
    return this.findOne(createPlaneacioneDto.auditoriaId);
  }

  findAll() {
    return `hola`;
  }

  findOne(id: string) {
    return this.planeacionRepository.findOneBy({auditoriaId: id })
  }

  update(id: number, updatePlaneacioneDto: UpdatePlaneacioneDto) {
    return `This action updates a #${id} planeacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} planeacione`;
  }

  
}
