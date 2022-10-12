import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AtualizarPostRequest {

    @IsNotEmpty() idPost: number;
    @IsString() @IsNotEmpty() title?: string;
    @IsString() @IsOptional() content?: string;
    @IsEmail() @IsNotEmpty() authorEmail?: string
}

