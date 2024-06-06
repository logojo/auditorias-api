import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Auditoria } from "./auditoria.entity";

@Entity({name:'ejercicios'})
export class Ejercicio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('int')
    ejercicio: number;

    @Column('boolean', {
        default: true
    })
    status:boolean

    @OneToMany(
        () => Auditoria,
        (auditoria) => auditoria.ejercicio
    )
    auditorias: Auditoria[]

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn() 
    updated_at: string
   
}