import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Auditoria } from "./auditoria.entity";

@Entity({name:'tipo_auditoria'})
export class TipoAuditoria {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    nombre: string;

    @OneToMany(
        () => Auditoria,
        (auditoria) => auditoria.tipo_auditoria
    )
    auditorias: Auditoria[]

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn() 
    updated_at: string
   
}