import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthRoleGuard implements CanActivate {

  constructor (  private readonly reflector : Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const validRoles : string[] = this.reflector.get(META_ROLES, context.getHandler());

    if( !validRoles ) return true;
    if( validRoles.length === 0 ) return true;

    const req = context.switchToHttp().getRequest()
  
    const user = req.user as User;

    if( !user )
        throw new BadRequestException('El usuario no existe')

    for ( const role of user.roles ){
          if(validRoles.includes( role ))
            return true;
    }

    throw new ForbiddenException(`No esta autorizado para realizar esta acción`);
  }
}
