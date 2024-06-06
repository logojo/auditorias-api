export const fileDestination = ( req: Express.Request, file: Express.Multer.File, callback: Function  ) => {
    
    callback(null, './static/documents');
} 