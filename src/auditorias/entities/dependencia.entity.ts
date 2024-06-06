import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Auditoria } from "./auditoria.entity";

@Entity({name:'dependencias'})
export class Dependencia {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    dependencia:string;

    @Column('varchar')
    siglas:string;

    @OneToMany(
        () => Auditoria,
        (auditoria) => auditoria.dependencia
    )
    auditorias: Auditoria[]

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn() 
    updated_at: string
   
}