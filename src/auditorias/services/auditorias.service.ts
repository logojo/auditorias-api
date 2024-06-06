import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auditoria, Dependencia, Ejercicio, Programa } from '../entities';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

import { CustomPaginatorSerializer } from 'src/common/helpers/customPaginatorSerializer';
import { TipoAuditoria } from '../entities/tipo-auditoria.entity';
import { CreateAuditoriaDto, UpdateAuditoriaDto, SearchAuditoriaDto } from '../dto';

@Injectable()
export class AuditoriasService {

  constructor (
    @InjectRepository(Auditoria)
    private readonly auditoriaReporsitory : Repository<Auditoria>,

    @InjectRepository(TipoAuditoria)
    private readonly tipoReporsitory : Repository<TipoAuditoria>,

    @InjectRepository(Dependencia)
    private readonly dependenciaReporsitory : Repository<Dependencia>,

    @InjectRepository(Programa)
    private readonly programaReporsitory : Repository<Programa>,

    @InjectRepository(Ejercicio)
    private readonly ejercicioReporsitory : Repository<Ejercicio>,

    private customPaginatorSerializer: CustomPaginatorSerializer<Auditoria>,
  ) { }

  async create(createAuditoriaDto: CreateAuditoriaDto, user : User) {  
      const auditoria = this.auditoriaReporsitory.create({
        ...createAuditoriaDto,
        user
      })
  
      await this.auditoriaReporsitory.save( auditoria )
      return this.findOne(auditoria.id);
    
  }

  async findAll( paginationsDto : IPaginationOptions ) {
    const auditorias =  this.auditoriaReporsitory.createQueryBuilder('auditorias');

    await auditorias.innerJoin("auditorias.dependencia", "dependencia")
                    .innerJoin("auditorias.ejercicio", "ejercicio")
                    .innerJoin("auditorias.programa", "programa")
                    .innerJoin("auditorias.tipo_auditoria", "tipo")
                    .select([
                        "auditorias.id",
                        "auditorias.folio",
                        "auditorias.representantes",
                        "dependencia.dependencia",
                        "dependencia.siglas",
                        "ejercicio.ejercicio",
                        "programa.programa",
                        "tipo.nombre",
                        "auditorias.status",
                        "auditorias.etapa"
                    ])
                    .getMany();

    
    const results = await paginate<Auditoria>(auditorias, paginationsDto);
    return this.customPaginatorSerializer.serialize(results);

  }

  async search( search : SearchAuditoriaDto, paginationsDto : IPaginationOptions ) {
    const { term } = search;
    
    const auditorias =  this.auditoriaReporsitory.createQueryBuilder('auditorias');

    await auditorias.innerJoin("auditorias.dependencia", "dependencia")
                    .innerJoin("auditorias.ejercicio", "ejercicio")
                    .innerJoin("auditorias.programa", "programa")
                    .innerJoin("auditorias.tipo_auditoria", "tipo")
                    .select([
                        "auditorias.id",
                        "auditorias.folio",
                        "auditorias.representantes",
                        "dependencia.dependencia",
                        "dependencia.siglas",
                        "ejercicio.ejercicio",
                        "programa.programa",
                        "tipo.nombre",
                        "auditorias.status",
                        "auditorias.etapa"
                    ])
                    .where("auditorias.folio like :folio", { folio: `%${term}%` })
                    .orWhere("auditorias.representantes like :representantes", { representantes: `%${term}%` })
                    .orWhere("dependencia.dependencia like :dependencia", { dependencia: `%${term}%` })
                    .orWhere("ejercicio.ejercicio like :ejercicio", { ejercicio: `%${term}%` })
                    .orWhere("programa.programa like :programa", { programa: `%${term}%` })
                    .orWhere("auditorias.etapa like :etapa", { etapa: `%${term}%` })
                    .orWhere("tipo.nombre like :nombre", { nombre: `%${term}%` })
                    .getMany();

    
    const results = await paginate<Auditoria>(auditorias, paginationsDto);
    return this.customPaginatorSerializer.serialize(results);
  }

  async getCatalogos(){
    const tipos = await this.tipoReporsitory.find({select: { id: true, nombre: true}})
    const dependencias = await this.dependenciaReporsitory.find({select: { id: true, dependencia: true}})  
    const programas = await this.programaReporsitory.find({select: { id: true, programa: true}})
    const ejercicios = await this.ejercicioReporsitory.find({select: { id: true, ejercicio: true}})

    return {
      tipos,
      dependencias,
      programas,
      ejercicios
    }
  
  }

  async findOne(id: string) {
    const  auditoria = await this.auditoriaReporsitory.findOneBy({ id: id });

    return {
      id: auditoria.id,
      tipo: auditoria.tipo_auditoria.nombre,
      folio: auditoria.folio,
      representantes: auditoria.representantes,
      programa: auditoria.programa.programa,
      ejercicio: auditoria.ejercicio.ejercicio,
      dependencia: auditoria.dependencia.dependencia,
      siglas: auditoria.dependencia.siglas,
      etapa: auditoria.etapa,
      status: auditoria.status,
    }
  }

  async update(id: string, updateAuditoriaDto: UpdateAuditoriaDto) {

    const auditoria = await this.auditoriaReporsitory.preload({
      id,
      ...updateAuditoriaDto
    })

     if( !auditoria ) throw  new NotFoundException(`Auditoria no encontrada`);
     
     await this.auditoriaReporsitory.save( auditoria )

     return this.findOne(id);
  }

  async remove(id: string) {
    const auditoria = await this.auditoriaReporsitory.findOneBy({id});
    
    if( !auditoria ) throw new NotFoundException(`Auditoria no encontrada` )

      await this.auditoriaReporsitory.delete( id );  
      return  auditoria ;
  
  }
}
