import { Module } from '@nestjs/common';
import { UserPersistenceAdapter } from './persistence-adapter/user-persistence-adapter';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user/user.controller';

import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPersistenceAdapter,
    },
  ],
})
export class AppModule { }
