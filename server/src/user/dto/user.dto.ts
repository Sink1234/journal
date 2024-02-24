import { IsEmail, IsNumber, IsOptional, IsString, Max, Min, MinLength } from "class-validator";

export class UserDto {
    @IsOptional()
    @IsEmail()
    email:string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @MinLength(6, {
        message: 'Пароль должен состоять минимум из 6 символов'
    })
    @IsString()
    password:string

    @IsOptional()
    @IsString()
    second_name?: string

    @IsOptional()
    @IsString()
    surname?: string

    @IsOptional()
    @IsString()
    dateOfBirthday?: string 

    @IsOptional()
    @IsString()
    photo?: string
}