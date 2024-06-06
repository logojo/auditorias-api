import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Alcance, Tipo } from "../interfaces/planeaciones.interface";
import { Auditoria } from "src/auditorias/entities";


@Entity({name: 'planeaciones'})
export class Planeacion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 11, scale: 2 })
    monto: number;

    @Column({
        type: 'enum',
        enum: Tipo,
        default: null
    })
    tipo: Tipo;

    @Column({
        type: 'enum',
        enum: Alcance,
        default: null
    })
    alcance: Alcance;

    @Column('decimal', { precision: 11, scale: 2 })
    importe: number;

    @Column('int')
    porcentaje: number;

    @Column('boolean', {
        default: false
    })
    asisteTitular: boolean;

    @Column('int')
    step: number;

    @Column({name: 'auditoriaId'})
    auditoriaId: string;

    @OneToOne(() => Auditoria )
    @JoinColumn({name:'auditoriaId'})
    auditoria: Auditoria

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn() 
    updated_at: string
   
}
