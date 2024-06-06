import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, writeFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {

    constructor( private readonly configService : ConfigService){}
  
    getStaticFile( fileName : string ) {
        const path = join( __dirname, '../../static/products', fileName);

        if( !existsSync(path) )
            throw new BadRequestException(`file not found`)

        return path;
    }
}
