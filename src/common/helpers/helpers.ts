import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Acta, Categoria, DocumentType } from "../../auditorias/interfaces/documents.interface";
import { Etapa, TipoAuditoria } from "../../auditorias/interfaces/auditorias.interface";

@Injectable()
export class CommonHelpers {
    handleExceptions ( error : any ) : never {
        if( error.errno === 1452 ) // error intertar insertar foreing key erronea
          throw new BadRequestException( error.sqlMessage )
        else if( error.errno === 1062 ) // error al insertar campo con indice existente(duplicado)
          throw new BadRequestException( error.sqlMessage )
        else if( error.errno === 1451 ) // error al insertar campo con indice existente(duplicado)
            throw new BadRequestException( 'No se puede eliminar este registro' )
    
        throw new InternalServerErrorException('Upss, something went wrong')
    }

    getDocument( step : number, tipo : TipoAuditoria  ) {
       
      if( step == 1 ) {
          if( tipo == TipoAuditoria.Reviciones )
              return DocumentType.Citacion;
          else
              return DocumentType.Programa; 
      }   
      else if( step == 2 ) {
          if( tipo == TipoAuditoria.Directas || tipo == TipoAuditoria.Evaluaciones )
              return DocumentType.Cronograma_AE;
          else if( tipo == TipoAuditoria.Reviciones )
              return DocumentType.Representacion;
          else
              return DocumentType.Carta;
      }
      else if ( step == 3 ) {
          if( tipo == TipoAuditoria.Directas || tipo == TipoAuditoria.Evaluaciones )
              return DocumentType.Cronograma_AR;
          else
              return DocumentType.Orden;
      }
      else if ( step == 4 )  {
          if( tipo == TipoAuditoria.Directas || tipo == TipoAuditoria.Evaluaciones )
              return DocumentType.Cronograma_SE;
          else
             return DocumentType.Representacion;
      } 
      else if ( step == 5 ) {
          if( tipo == TipoAuditoria.Directas || tipo == TipoAuditoria.Evaluaciones )
              return DocumentType.Cronograma_SR; 
          else
              return DocumentType.Designacion;
      } 
      else if ( step == 6 ) {
           if( tipo == TipoAuditoria.Directas || tipo == TipoAuditoria.Evaluaciones )
              return DocumentType.Citacion; 
          else 
              return DocumentType.Citacion;    
      }
      else if ( step == 7 ){
          if( tipo == TipoAuditoria.Directas || tipo == TipoAuditoria.Evaluaciones )
            return DocumentType.Representacion; 
          else 
            return DocumentType.Acta; 
      }      
      else if( step == 8 ){
          if( tipo == TipoAuditoria.Directas || tipo == TipoAuditoria.Evaluaciones )
            return DocumentType.Orden; 
          else
            return DocumentType.Acta;
      }  
      else if( step == 9 ){
              return DocumentType.Acta; 
      }
      
    }

    getDocumetEjecucion( step : number, tipo : TipoAuditoria ) {
        if( step === 1 ) {
            return DocumentType.Prorroga_S;
        }
        else if( step === 2 ) {
            return DocumentType.Prorroga_A;
        }
        else if( step === 3 ) {
            return DocumentType.Entrega;
        }
        else if( step === 4 ) {
            return DocumentType.Envio;
        }
        else if( step === 5 ) {
            return DocumentType.Complementarios;
        }
        else if( step === 6 ) {
            return DocumentType.Observacion;
        }
        else if( step === 7 ) {
            return DocumentType.Citacion;
        }
        else if( step === 8 ) {
            return DocumentType.Acta;
        }
        else if( step === 9 ) {
            return DocumentType.Envio;
        }
        else if( step === 10 ) {
            return DocumentType.Entrega;
        }
        else if( step === 11 ) {
            return DocumentType.Envio;
        }
    }

    getActa( step : number, tipo : TipoAuditoria, etapa: Etapa  ) {
        if( step == 7 ){
            if( tipo == TipoAuditoria.Conjuntas)
                return Acta.Inicio
            else
                return Acta.Envio
        } 
        else if( step == 8 ){
            if( etapa === Etapa.Planeación)
                return Acta.Envio;
            else if( etapa === Etapa.Ejecución)
                return Acta.Resultados;
        } else if( step == 9 ) {
            if( tipo == TipoAuditoria.Directas || tipo == TipoAuditoria.Evaluaciones )
                return Acta.Inicio;
        }   

        //return '';
    }

    getCategoria( step : number, tipo : TipoAuditoria  ){

        //Esto se ejecuta en planeaciones
        if( step == 1 ){
            if( tipo == TipoAuditoria.Reviciones)
                return Categoria.Inicio
        }

        //Esto se ejecuta en ejecuciones
        else if( step == 3  || step == 4 ){
            if( tipo == TipoAuditoria.Conjuntas)
                return Categoria.Requerimientos
        }

        else if( step == 7 ){
            if( tipo == TipoAuditoria.Conjuntas)
                return Categoria.Resultados_P
        }

        else if( step == 9 || step == 10 || step == 11){
            if( tipo == TipoAuditoria.Conjuntas)
                return Categoria.Documentacion_P
        }
        

        //return '';
    }
}
