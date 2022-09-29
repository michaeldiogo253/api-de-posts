import { UserRepository } from './../repository/user.repository';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(@Inject(UserRepository) private userRepository: UserRepository) {

  }

  create(createUserDto: CreateUserDto) {

    if (this.userRepository.existsUserByEmail(createUserDto.email)) {
      throw new BadRequestException("Email já cadastrado na base de dados");
    }

    return this.userRepository.criarUsuario(createUserDto);

  }

  findByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }

  findAll() {
    return this.userRepository.findAllUsers();
  }

  findOne(id: number) {
    return this.userRepository.findUserById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.atualizarUser(id, updateUserDto);
  }

  remove(id: number) {
    if (!this.userRepository.existsUserById(id)) {
      throw new NotFoundException("Usuario nao encontrado");
    }

    return this.userRepository.deleteUserById(id);
  }
}
