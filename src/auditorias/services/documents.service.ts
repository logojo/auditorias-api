import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "../entities";
import { CommonHelpers } from "src/common/helpers/helpers";
import { Repository } from "typeorm";
import { GetDocumentDto } from "../dto";
import { Etapa, TipoAuditoria } from "../interfaces/auditorias.interface";
import { Acta, DocumentType } from "../interfaces/documents.interface";

@Injectable()
export class DocumentsService {
    constructor (
        @InjectRepository(Document)
        private readonly documentRepository : Repository<Document>,
        private readonly helpers : CommonHelpers
      ) { }
    
      async getDocument( getDocumentDto: GetDocumentDto ) {      
           const { auditoriaId, step, tipo, etapa } = getDocumentDto;
           
           let type : DocumentType;
           let acta_type : Acta|undefined = undefined;
        
           if( etapa === Etapa.Planeación )            
               type = this.helpers.getDocument(step, tipo )
           else if ( etapa === Etapa.Ejecución )
                  type = this.helpers.getDocumetEjecucion(step, tipo )


           if( step === 9 && tipo === TipoAuditoria.Directas || step === 9 && tipo === TipoAuditoria.Evaluaciones){
               acta_type = Acta.Inicio
            }

            else if( step === 7 && tipo === TipoAuditoria.Conjuntas ){                
                acta_type =  Acta.Inicio;
            }
            else if( step === 8 && tipo === TipoAuditoria.Conjuntas ){
                acta_type = Acta.Envio;
            }
        
           
           const document = await this.documentRepository.findOne({
            select: {
                id: true,
                folio: true,                
                descripcion: true,
                fecha_inicio: true,
                fecha_termino: true,
                nombre_representacion: true,
                nombre_enlace: true,
                cargo_enlace: true,
                tipo_doc: true,
                tipo_oficio: true,
            },
            where: {
                auditoriaId: auditoriaId,
                tipo_doc: type,
                ...(acta_type && { acta: acta_type })
            },
        });       
        return document
      }
}