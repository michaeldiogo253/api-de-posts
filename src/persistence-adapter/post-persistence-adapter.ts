import { Injectable, NotFoundException, Param, Put } from "@nestjs/common";
import { Post } from "@prisma/client";
import { CadastrarPostRequest } from "src/post/dto/cadastrar-post.request";
import { PrismaService } from "src/prisma/prisma.service";
import { PostRepository } from "src/repository/post.repository";


@Injectable()
export class PostPersistenceAdapter implements PostRepository {

    constructor(private prisma: PrismaService) {

    }

    async findAllPost(): Promise<Post[]> {
       return await this.prisma.post.findMany();
    }

    async createPost(postRequest: CadastrarPostRequest) {
        return await this.prisma.post.create({
            data: {
                title: postRequest.title,
                content: postRequest.content,
                author: {
                    connect: { email: postRequest.authorEmail },
                },
            }
        });
    }

    async findPostById(idPost: number): Promise<Post> {
        const post = await this.prisma.post.findUnique({
            where: {
                id: idPost
            }
        });

        if (!post) {
            throw new NotFoundException("Post não encontrado");
        }

        return post;

    }

    async findPostsPublished(): Promise<Post[]> {
        return await this.prisma.post.findMany({
            where: {
                published: true
            }
        })
    }

    async publishPostById(idPost: number): Promise<Post> {
        return await this.prisma.post.update({
            data: { published: true },
            where: {
                id: idPost
            }
        })
    }

    async existsPostById(idPost: number): Promise<Boolean> {
        const quantidadePostPeloId = await this.prisma.post.count({
            where: {
                id: idPost
            }
        });

        if (quantidadePostPeloId == 0) {
            return false;
        }

        return true;
    }

    async deletePostById(idPost: number){
        await this.prisma.post.delete({
            where: {
                id: idPost
            }
        });

    }

}