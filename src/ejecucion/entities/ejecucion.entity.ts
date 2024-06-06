import { Auditoria } from "src/auditorias/entities";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'ejecuciones'})
export class Ejecucion {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('boolean')
    prorroga: boolean;

    @Column('boolean')
    plazo: boolean;

    @Column('int')
    step: number;

    @Column({name: 'auditoriaId'})
    auditoriaId: string;

    @OneToOne(()=> Auditoria)
    @JoinColumn({name: 'auditoriaId'})
    auditoria: Auditoria;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn() 
    updated_at: string


}
