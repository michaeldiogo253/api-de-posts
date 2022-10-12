import { UserRepository } from './../repository/user.repository';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(@Inject(UserRepository) private userRepository: UserRepository) {

  }

  async create(createUserDto: CreateUserDto) {

    if (await this.userRepository.existsUserByEmail(createUserDto.email)) {
      throw new BadRequestException("Email já cadastrado na base de dados");
    }

    return await this.userRepository.criarUsuario(createUserDto);

  }

  async findByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async findAll() {

    return await this.userRepository.findAllUsers();

  }

  async findOne(id: number) {
    return await this.userRepository.findUserById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.atualizarUser(id, updateUserDto);
  }

  async remove(id: number) {
    if (!this.userRepository.existsUserById(id)) {
      throw new NotFoundException("Usuario nao encontrado");
    }

    return await this.userRepository.deleteUserById(id);
  }
}
