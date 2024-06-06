import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get('refresh')
  @Auth()
  refresh(@GetUser() user : User){
    return this.authService.refresh( user )
  }

  
}
