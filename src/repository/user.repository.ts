import { UpdateUserDto } from './../user/dto/update-user.dto';
import { User } from "@prisma/client";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserEntity } from "src/user/entities/user.entity";

export interface UserRepository{

    criarUsuario(userDto: CreateUserDto);
    findUserById(idUser : number) : Promise<UserEntity>;
    findUserByEmail(email : string) : Promise<UserEntity>;
    findAllUsers(): Promise<UserEntity[]>;
    deleteUserById(idUser : number);
    atualizarUser(idUser : number, userDto : UpdateUserDto);
    existsUserById(idUser : number): Promise<boolean>;
    existsUserByEmail(email : string): Promise<boolean>;

}


export const UserRepository = Symbol('UserRepository');