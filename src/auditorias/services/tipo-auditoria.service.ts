import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TipoAuditoria } from "../entities";
import { Repository } from "typeorm";
import { CreateTipoAuditoriaDto } from "../dto";

@Injectable()
export class TipoAuditoriasService {
    constructor (
        @InjectRepository (TipoAuditoria)
        private readonly tipoAuditoriaReporsitory : Repository <TipoAuditoria>,
      ) { }
    
      async create( createTipoAuditoriaDto: CreateTipoAuditoriaDto) {
          const TipoAuditoria = this.tipoAuditoriaReporsitory.create(createTipoAuditoriaDto)
          await this.tipoAuditoriaReporsitory.save( TipoAuditoria)
        
          return TipoAuditoria;
      }
}