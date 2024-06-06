import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Programa } from "../entities";
import { Repository } from "typeorm";
import { CreateProgramaDto } from "../dto";

@Injectable()
export class ProgramasService {
    constructor (
        @InjectRepository(Programa)
        private readonly programaReporsitory : Repository<Programa>,
      ) { }
    
      async create( createProgramaDto: CreateProgramaDto) {
          const Programa = this.programaReporsitory.create(createProgramaDto)
          await this.programaReporsitory.save( Programa)
        
          return Programa;
      }
}