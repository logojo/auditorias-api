import { mkdirSync, writeFile } from 'fs';

import { Controller,  Post,  UseInterceptors, UploadedFile, Get, Param, Res, Body, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilesService } from './files.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FileDto } from './dto/file.dto';

import { CommonHelpers } from 'src/common/helpers/helpers';
import { Etapa } from 'src/auditorias/interfaces/auditorias.interface';

@Controller('files')
export class FilesController {

  constructor(
    private readonly filesService: FilesService,
    private readonly configService : ConfigService,
    private readonly helpers : CommonHelpers
  ) {}

  @Post('upload')
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
        new ParseFilePipe({ 
          validators: [
            new MaxFileSizeValidator({ maxSize: 100000 * 10 }),
            new FileTypeValidator({fileType:'pdf'})
          ],
          fileIsRequired: true
        })
      ) file : Express.Multer.File,
    @Body() body : FileDto
  ) {

    const year = new Date().getFullYear()
    let tipo_doc = ''

    if( body.etapa === Etapa.Planeación )
        tipo_doc = this.helpers.getDocument(+body.step, body.tipo )
    else if ( body.etapa === Etapa.Ejecución )
        tipo_doc = this.helpers.getDocumetEjecucion(+body.step, body.tipo )

    const etapa = this.helpers.getActa(+body.step, body.tipo, body.etapa) ? this.helpers.getActa(+body.step, body.tipo, body.etapa) : '';

    const document = tipo_doc + etapa; 
    let name = document.toString().replace(/\s/g,'')
    
    const fileExtension = file.mimetype.split('/')[1];
    const uploadPath = `./static/documents/${body.dependencia}/${year}/${body.folio}`
    mkdirSync(uploadPath, { recursive: true })
   
   
    writeFile(`${uploadPath}/${name}.${fileExtension}`, file.buffer, err => {
      if (err) {
        console.error(err);
      } 
    })

    const secureUrl = `${this.configService.get('HOST_API')}/files/documents/${body.dependencia}/${year}/${body.folio}/${name}.${fileExtension}`;
      
    return {
      secureUrl
    };
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', { 
  //   fileFilter: fileFilter,
  //   limits: { fileSize: 100000 }, 
  //   storage: diskStorage({
  //     destination: './static/documents',
  //     filename: fileNamer
  //   })
  // }))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {

  //   if( !file ) {
  //     throw new BadRequestException(`There's no valid file`)
  //   }


  //   const secureUrl = `${this.configService.get('HOST_API')}/files/documents/${file.filename}`;
      
  //   return {
  //     secureUrl
  //   };
  // }


  @Get('upload/:fileName')
  findFile( 
    @Res() res: Response,
    @Param('fileName') fileName : string
  ){
  const path = this.filesService.getStaticFile( fileName )
  
  res.sendFile( path )
  }


 
}
