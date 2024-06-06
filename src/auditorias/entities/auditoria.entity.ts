import { User } from 'src/auth/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Dependencia } from './dependencia.entity';
import { Ejercicio } from './ejercicio.entity';
import { Programa } from './programa.entity';
import { TipoAuditoria } from './tipo-auditoria.entity';
import { Etapa, Representates } from '../interfaces/auditorias.interface';
import { Document } from './documents.entity';

@Entity({name: 'auditorias'})
export class Auditoria {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {
        unique: true
    })
    folio: string;

    @Column({
        type: 'enum',
        enum: Representates,
        default: null
    })
    representantes?: Representates

    @Column({
        type: 'enum',
        enum: Etapa,
        default: Etapa.Inicio
    })
    etapa?: Etapa

    @Column('boolean', {
        default: false
    })
    status: boolean;

    @Column('boolean', {
        default: false
    })
    finalizada: boolean;

    @ManyToOne(
        () => User,
        (user) => user.auditoria
    )
    user: User;


    @Column({name: 'dependenciaId'})
    dependenciaId: string;

    @ManyToOne( 
        () => Dependencia, 
        (dependencia) => dependencia.auditorias,
        { eager:true } 
    )
    @JoinColumn({name: 'dependenciaId'})
    dependencia: Dependencia;

    @Column({name: 'ejercicioId'})
    ejercicioId: string;

    @ManyToOne( 
        () => Ejercicio, 
        (ejercicio) => ejercicio.auditorias,
        { eager:true } 
    )
    @JoinColumn({name: 'ejercicioId'})
    ejercicio: Ejercicio;

    @Column({name: 'programaId'})
    programaId: string;

    @ManyToOne(
        () => Programa, 
        (programa) => programa.auditorias,
        { eager:true }  
    )       
    @JoinColumn({name: 'programaId'})
    programa: Programa;

    @Column({name: 'tipoAuditoriaId'})
    tipoAuditoriaId: string;
    
    @ManyToOne(
        () => TipoAuditoria, 
        (tipo_auditoria) => tipo_auditoria.auditorias,
        { eager:true }  
    )
    @JoinColumn({name: 'tipoAuditoriaId'})
    tipo_auditoria: TipoAuditoria;

    @OneToMany(
        () => Document,
        (document) => document.auditoria
    )
    documents: Document[]

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn() 
    updated_at: string
   


}
