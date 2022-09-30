import { PostRepository } from './repository/post.repository';
import { PostController } from './post/post.controller';
import { Module } from '@nestjs/common';
import { UserPersistenceAdapter } from './persistence-adapter/user-persistence-adapter';
import { PostService } from './post/pots.service';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user/user.controller';

import { UserService } from './user/user.service';
import { PostPersistenceAdapter } from './persistence-adapter/post-persistence-adapter';

@Module({
  imports: [],
  controllers:
    [UserController,
      PostController],
  providers: [
    UserService,
    PrismaService,
    PostService,
    {
      provide: UserRepository,
      useClass: UserPersistenceAdapter,
    },
    {
      provide: PostRepository,
      useClass: PostPersistenceAdapter,
    },
  ],
})
export class AppModule { }
