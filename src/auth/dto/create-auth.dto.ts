import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La contraseña debe contener una letra mayuscula una miniscula y un numero'
    })
    password: string;
}
