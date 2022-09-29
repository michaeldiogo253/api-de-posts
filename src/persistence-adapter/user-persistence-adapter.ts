import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserRepository } from './../repository/user.repository';

@Injectable()
export class UserPersistenceAdapter implements UserRepository {

    constructor(private prisma: PrismaService) {

    }

    async existsUserByEmail(email: string): Promise<boolean> {
        const existEmail = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existEmail) {
            return true;
        }

        return false;
    }

    async criarUsuario(userDto: CreateUserDto) {


        return await this.prisma.user.create({
            data: {
                email: userDto.email,
                name: userDto.name
            }
        })
    }

    async findUserById(idUser: number): Promise<UserEntity> {
        const usuario = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });

        if (!usuario) {
            throw new NotFoundException("Usuario nao encontrado");
        }

        return usuario;

    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const usuario = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!usuario) {
            throw new NotFoundException("Usuario nao encontrado");
        }

        return usuario;
    }

    async findAllUsers(): Promise<UserEntity[]> {
        return await this.prisma.user.findMany();
    }

    async deleteUserById(idUser: number) {

        return await this.prisma.user.delete({
            where: {
                id: idUser
            }
        })
    }

    async atualizarUser(idUser: number, userDto: UpdateUserDto) {
        return await this.prisma.user.update({
            where: {
                id: idUser
            },
            data: {
                name: userDto.name,
                email: userDto.email
            }
        });
    }

    async existsUserById(idUser: number): Promise<boolean> {

        const usuario = await this.prisma.user.findUnique({
            where: {
                id: idUser
            }
        });

        if (usuario) {
            return true;
        }

        return false;
    }


}