import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Dependencia } from "../entities";
import { Repository } from "typeorm";
import { CreateDependenciaDto } from "../dto/create-dependencia";

@Injectable()
export class DependenciasService {
    constructor (
        @InjectRepository(Dependencia)
        private readonly dependenciaReporsitory : Repository<Dependencia>,
      ) { }
    
      async create( createDependenciaDto: CreateDependenciaDto) {
          const dependencia = this.dependenciaReporsitory.create(createDependenciaDto)
          await this.dependenciaReporsitory.save( dependencia)
        
          return dependencia;
      }
}