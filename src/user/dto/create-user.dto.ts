import { IsEmail, isEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsEmail() email: string;
    @IsNotEmpty() @IsString() name: string;

}
