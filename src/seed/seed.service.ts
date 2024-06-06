import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>
  ) { }

  async seed() {
     const data = initialData.users;

     const users : User[] = [];

     data.forEach( user => {
      users.push( this.userRepository.create( user ))
     })

     await this.userRepository.save( users )
  }

}
