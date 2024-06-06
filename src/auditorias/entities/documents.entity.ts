import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne,  PrimaryGeneratedColumn,  UpdateDateColumn } from "typeorm";
import { Etapa } from "../interfaces/auditorias.interface";
import { Acta, Categoria, DocumentType, Oficio } from "../interfaces/documents.interface";
import { Auditoria } from "./auditoria.entity";

@Entity({name: 'documents'})
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    descripcion: string;

    @Column({
        type: 'enum',
        enum: Etapa,
        default: null
    })
    etapa?: Etapa

    @Column('varchar')
    folio: string;
    
    @Column('date')
    fecha_inicio: string;
    
    @Column('date')
    fecha_termino: string;

    @Column('varchar')
    nombre_representacion: string;

    @Column('varchar')
    nombre_enlace: string;

    @Column('varchar')
    cargo_enlace: string;

    @Column({
        type: 'enum',
        enum: DocumentType,
        default: null
    })
    tipo_doc: DocumentType;

    @Column({
        type: 'enum',
        enum: Oficio,
        default: null
    })
    tipo_oficio: Oficio;

    @Column({
        type: 'enum',
        enum: Acta,
        default: null
    })
    acta: Acta;

    @Column({
        type: 'enum',
        enum: Categoria,
        default: null
    })
    categoria: Categoria

    @Column('varchar')
    archivo: string

    @Column({name: 'auditoriaId'})
    auditoriaId: string;

    @ManyToOne( 
        () => Auditoria, 
        (auditoria) => auditoria.documents
    )
    @JoinColumn({name: 'auditoriaId'})
    auditoria: Auditoria;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn() 
    updated_at: string
 }