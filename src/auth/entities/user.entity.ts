import { Auditoria } from "src/auditorias/entities/auditoria.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar', {
        select: false
    })
    password: string;

    @Column('boolean', {
        default: true
    })
    status: boolean;

    @Column('json')
    roles: string[]

    @OneToMany(
        () => Auditoria,
        (auditoria) => auditoria.user
    )
    auditoria: Auditoria

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn() 
    updated_at: string
   

   

    
}
