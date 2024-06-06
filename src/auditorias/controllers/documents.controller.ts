import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';

import { GetDocumentDto } from '../dto';
import { DocumentsService } from '../services';
import { HandleErrors } from 'src/common/decorators/error-handler.decorator';

@Controller('documents')
export class DocumentsController {

    constructor(private readonly documentsService: DocumentsService) {}

    @Post('find-one')
    @Auth()
    @HandleErrors()
    getDocument(@Body() getDocumentDto: GetDocumentDto) {
        return this.documentsService.getDocument( getDocumentDto );
    }
}
