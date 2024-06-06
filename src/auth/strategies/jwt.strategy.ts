import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly  userRepository : Repository<User>,
        configService : ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async  validate( { id } : JwtPayload ) : Promise<User> {
        const user = await this.userRepository.findOneBy({id})

        if( !user )
            throw new UnauthorizedException('token no valido')

        if( !user.status )
            throw new UnauthorizedException('Usuario Inactivo')

        return user;
    }
}