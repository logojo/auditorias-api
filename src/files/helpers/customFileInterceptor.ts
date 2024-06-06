import { CallHandler, ExecutionContext, Inject, NestInterceptor, Optional, mixin, Type } from "@nestjs/common";
import { FileInterceptor, MulterModuleOptions } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { MULTER_MODULE_OPTIONS } from '@nestjs/platform-express/multer/files.constants';
import * as multer from 'multer';

export const CustomFileInterceptor = ( fieldname: string,  localOptions?: (context: ExecutionContext) => MulterOptions,) => {
    const FileInterceptorIntance = FileInterceptor( fieldname );

    class MixinInterceptor extends FileInterceptorIntance {
        protected multer : any;
        protected moduleOptios: {};

        constructor(
            @Optional()
            @Inject(MULTER_MODULE_OPTIONS)
            options: MulterModuleOptions
        ) {
            super();
            this.moduleOptios = options;
        }

        intercept(context: ExecutionContext, next: CallHandler<any>): any {
            this.multer = (multer as any)({
               ...this.moduleOptios,
               ...localOptions(context)
            })

            return super.intercept(context, next)
        }
    }

    const Interceptor = mixin(MixinInterceptor);
    return Interceptor as Type<NestInterceptor>
}