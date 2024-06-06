
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { User } from './entities/user.entity';
import { LoginAuthDto } from './dto/create-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

  constructor (
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
    private readonly jwtService : JwtService
  ) {}

  async login( loginAuthDto: LoginAuthDto ) {
   const { email, password } = loginAuthDto;

   const user = await this.userRepository.findOne({
    where : { email },
    select: { id: true, name: true, email: true, password: true, roles: true }
   });

   if( !user )
       throw new UnauthorizedException('Usuario o contraseña incorrectos')

   if( !bcrypt.compareSync(password, user.password))
       throw new UnauthorizedException('Usuario o contraseña incorrectos')

   delete user.password
   delete user.id

   return {
    user,
    token: this.getJwtToken({ id: user.id })
   }
  }

  refresh( user : User ) {
    return {
      user: {
        name: user.name,
        email: user.email,
        roles: user.roles
      },
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken( payload : JwtPayload ) {
    return this.jwtService.sign(payload)
  }

  
}
