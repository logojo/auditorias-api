import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { HandleErrors } from 'src/common/decorators/error-handler.decorator';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  seed() {
    return this.seedService.seed();
  }

  @Get('decorators')
  @HandleErrors()
  decorators() {
    throw new Error('Error de ejemplo')
    return `Este en un ejemplo con decoradores personalizados`
  }

  
}
