import { Pagination } from 'nestjs-typeorm-paginate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomPaginatorSerializer<T> {
  serialize(options: Pagination<T>): any {
    return {
      items: options.items.map(( item : any ) => {
        // Personaliza la serialización de cada elemento si es necesario
        return {
          id: item.id,
          tipo: item.tipo_auditoria.nombre,
          folio: item.folio,
          representantes: item.representantes,
          programa: item.programa.programa,
          ejercicio: item.ejercicio.ejercicio,
          dependencia: item.dependencia.dependencia,
          siglas: item.dependencia.siglas,
          etapa: item.etapa,
          status: item.status,
          
        };
      }),
      meta: {
        totalItems: options.meta.totalItems,
        itemCount: options.meta.itemCount,
        itemsPerPage: options.meta.itemsPerPage,
        totalPages: options.meta.totalPages,
        currentPage: options.meta.currentPage,
      },
    };
  }
}