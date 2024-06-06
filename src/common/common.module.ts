import { Module } from '@nestjs/common';
import { CommonHelpers } from './helpers/helpers';
import { CustomPaginatorSerializer } from './helpers/customPaginatorSerializer';

@Module({
  providers: [
    CommonHelpers,
    CustomPaginatorSerializer
  ],
  exports: [CommonHelpers, CustomPaginatorSerializer],
})
export class CommonModule {}
