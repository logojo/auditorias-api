import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Auditoria } from "./auditoria.entity";

@Entity({name:'programas'})
export class Programa {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    programa: string;

    @Column('boolean', {
        default: true
    })
    status:boolean

    @OneToMany(
        () => Auditoria,
        (auditoria) => auditoria.programa
    )
    auditorias: Auditoria[]

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn() 
    updated_at: string
   
}