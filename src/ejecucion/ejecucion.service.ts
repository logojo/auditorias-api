import { Injectable } from '@nestjs/common';
import { CreateEjecucionDto } from './dto/create-ejecucion.dto';
import { UpdateEjecucionDto } from './dto/update-ejecucion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ejecucion } from './entities/ejecucion.entity';
import { DataSource, Repository } from 'typeorm';
import { Auditoria, Document } from '.././auditorias/entities';
import { DocumentsService } from '.././auditorias/services';
import { CommonHelpers } from '.././common/helpers/helpers';
import { Etapa, TipoAuditoria } from '.././auditorias/interfaces/auditorias.interface';
import { SkipStepDto } from './dto/skip-step.dto';

@Injectable()
export class EjecucionService {

  constructor(
    @InjectRepository(Ejecucion)
    private readonly ejecucionRepository : Repository<Ejecucion>,

    @InjectRepository(Auditoria)
    private readonly auditoriaRepository : Repository<Auditoria>,

    @InjectRepository(Document)
    private readonly documentRepository : Repository<Document>,

    private readonly dataSource : DataSource,
    private readonly documentService : DocumentsService,
    private readonly helpers : CommonHelpers
  ){ }

  async create(createEjecucionDto: CreateEjecucionDto) {
      const ejecucion = await this.ejecucionRepository.findOneBy({ auditoriaId: createEjecucionDto.auditoriaId });
      const auditoria = await this.auditoriaRepository.findOneBy({ id: createEjecucionDto.auditoriaId }); 
      const tipo_auditoria = auditoria.tipo_auditoria.nombre as TipoAuditoria;

      let step: number = 0;

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction()

      if(( !ejecucion || createEjecucionDto.step >= ejecucion.step) && createEjecucionDto.step < createEjecucionDto.total) {            
        step = createEjecucionDto.step + 1;          
      }else {
          step = ejecucion.step;
      }

      try {
        await  queryRunner.manager.getRepository(Ejecucion).upsert([
          { 
            auditoriaId: createEjecucionDto.auditoriaId,            
            prorroga: createEjecucionDto.prorroga === '1' ? true : false,
            plazo: createEjecucionDto.plazo === '1' ? true : false,
            step: step 
          },
         ], ["auditoriaId"])

         const existDoc = await this.documentService.getDocument({
          auditoriaId: createEjecucionDto.auditoriaId,
          step: createEjecucionDto.step,
          tipo: tipo_auditoria,
          etapa: Etapa.Ejecución
        });
        
        
        const doc = {
          etapa: Etapa.Ejecución,
          folio: createEjecucionDto.folio,
          descripcion: createEjecucionDto.descripcion,
          fecha_inicio:  createEjecucionDto.fecha_inicio,
          fecha_termino:  createEjecucionDto.fecha_termino,
          nombre_representacion:  createEjecucionDto.nombre_representacion,
          nombre_enlace:  createEjecucionDto.nombre_enlace,
          cargo_enlace:  createEjecucionDto.cargo_enlace,
          tipo_doc: this.helpers.getDocumetEjecucion(createEjecucionDto.step, tipo_auditoria ),   
          tipo_oficio :createEjecucionDto.tipo_oficio,
          acta:  this.helpers.getActa(createEjecucionDto.step, tipo_auditoria, Etapa.Ejecución ),            
          categoria:  this.helpers.getCategoria(createEjecucionDto.step, tipo_auditoria ),    
          archivo:  createEjecucionDto.archivo,
          auditoriaId: createEjecucionDto.auditoriaId     
        }

        if( existDoc ) {   
          await queryRunner.manager.update(Document, { id: existDoc.id }, { ...doc })     
        } else{            
          const document = this.documentRepository.create(doc)
          await queryRunner.manager.save( document )
        }

        if( createEjecucionDto.step === 1 )
          await queryRunner.manager.update(Auditoria, { id: createEjecucionDto.auditoriaId }, { etapa:Etapa.Ejecución, status: false })
      else if( createEjecucionDto.step === createEjecucionDto.total )
          await queryRunner.manager.update(Auditoria, { id: createEjecucionDto.auditoriaId }, { etapa:Etapa.Ejecución, status: true  })

      await queryRunner.commitTransaction();
      await queryRunner.release();

      } catch (error) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        this.helpers.handleExceptions( error );
      }

      return this.findOne(createEjecucionDto.auditoriaId);
  }

  async skipStep( skipStepDto: SkipStepDto ) {
  const { id, step } = skipStepDto;

    const ejecucion = await this.ejecucionRepository.preload({
      id,
      step: step
    })

     await this.ejecucionRepository.save( ejecucion )

     return await this.ejecucionRepository.findOneBy({ id })
  }

  findAll() {
    return `This action returns all ejecucion`;
  }

  findOne(id: string) {
    return this.ejecucionRepository.findOneBy({auditoriaId: id })
  }

  update(id: number, updateEjecucionDto: UpdateEjecucionDto) {
    return `This action updates a #${id} ejecucion`;
  }

  remove(id: number) {
    return `This action removes a #${id} ejecucion`;
  }
}
