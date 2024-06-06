export enum DocumentType {

    //planeación
    Programa = 'Programa Anual de Fiscalización ó Programa de trabajo',
    Carta = 'Carta de Planeación',
    Cronograma_AE = 'Cronograma de actividades estimado',
    Cronograma_SE = 'Cronograma de seguimiento estimado',
    Cronograma_AR = 'Cronograma de actividades real',
    Cronograma_SR = 'Cronograma de seguimiento real',
    Citacion = 'Oficio de citación para notificación', // citaciones y notificaciones [ Inicio_Auditoría, observaciones, resultados preliminares,  resultados definitivos]
    Orden = 'Orden de Auditoría',
    Acta = 'Actas Administrativas', // ['Inicio','Resultados','Envio','Cierre'] esta tipo se trabaja en conjunto con el campo Acta en tabla
    Representacion = 'oficios de de representación',
    Designacion = 'Oficio de Designación',   

    //ejecución
    Prorroga_S = 'Oficio de Solicitud de Prórroga',  
    Prorroga_A = 'Oficio de Autorizacion de Prórroga',
    Envio = 'Oficios de Envio',    
    Entrega = "Oficios de Entrega",
    Complementarios = "Oficios complementarios",
    Observacion = "Observación",    
    Resultado = "Resultados",

    //Informe
    Informe = "Informe de Auditoría",

    //Conclusión
    Traslado  = "Oficio de traslado de expediente al área de investigación",
    Transparencia  = "Transparencia",
}

export enum Oficio  {
    A = 'Ampliación de programa(s), rubro(s), ejercicio(s), capitulo(s), área(s)',
    B = 'Ampliación de personal del grupo de auditorias',
    C = 'Requerimientos de información adicional',
}

export enum Acta {
    Inicio = 'Acta de Inicio de Auditoría',
    Envio = 'Oficio de envío del acta y requerimientos',
    Resultados = 'Acta Administrativa de Resultados Preliminares',
    Resultados_Def = 'Acta Administrativa de Resultados Definitivos',
    Seguimiento = 'Acta Administrativa del Seguimiento de la Auditoría',
    Cierre = 'Acta Administrativa del Cierre de la Auditoría',
}

export enum Categoria {
    Inicio  = 'Inicio de Auditoría', // tipo_doc Citacion
    Observaciones = 'Observaciones y cierre de auditoría', // tipo_doc Citacion
    Resultados_P = 'Resultados preliminares',// tipo_doc Citacion, Entrega, Envio
    Resultados_D = 'resultados definitivos', // tipo_doc Citacion, Entrega, Envio
    Requerimientos = 'Atención a los requerimientos de información', // tipo_doc Entrega, Envio
    Documentacion_P = 'Documentación para la atencion de resultados preliminares',
    Documentacion_D = 'Documentación para la atencion de resultados definitivos',

}
