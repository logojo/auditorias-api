import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ejercicio } from "../entities";
import { CommonHelpers } from "src/common/helpers/helpers";
import { Repository } from "typeorm";
import { CreateEjercicioDto } from "../dto";

@Injectable()
export class EjerciciosService {
    constructor (
        @InjectRepository(Ejercicio)
        private readonly ejercicioReporsitory : Repository<Ejercicio>,
        private readonly helpers : CommonHelpers
    ) { }
    
    async create( createEjercicioDto: CreateEjercicioDto) {
        const Ejercicio = this.ejercicioReporsitory.create(createEjercicioDto)
        await this.ejercicioReporsitory.save( Ejercicio)
      
        return Ejercicio;
    }
}