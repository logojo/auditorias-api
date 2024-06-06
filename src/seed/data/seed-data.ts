import * as bcrypt from 'bcrypt'

interface SeedUser {
    email    : string;
    name     : string;
    password : string;
    roles    : string[];
}

interface SeedData {
    users: SeedUser[];
}

export const initialData : SeedData = {
    users: [
        {
            email    : 'joel@zacatecas.gob.mx',
            name     : 'Joel Flores',
            password : bcrypt.hashSync( '1234Qwer', 10),
            roles    : ['root']
        }
    ]
}