import { PostRepository } from './../repository/post.repository';
import { Get, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CadastrarPostRequest } from './dto/cadastrar-post.request';

@Injectable()
export class PostService {


    constructor(@Inject(PostRepository) private postRepository: PostRepository) {

    }

    async findPostById(id: number) {
        return await this.postRepository.findPostById(id);
    }

    async createPost(createRequest: CadastrarPostRequest) {

        return await this.postRepository.createPost(createRequest);
    }

    async getPostsPublished() {
        return await this.postRepository.findPostsPublished();
    }

    async publishPost(id: number) {

        const existPost = await this.postRepository.existsPostById(id);

        if (!existPost) {
            throw new NotFoundException("Post não encontrado");
        }

        return await this.postRepository.publishPostById(id);
    }

    async deletePost(id: number) {
        const existPost = await this.postRepository.existsPostById(id);

        if (!existPost) {
            throw new NotFoundException("Post não encontrado");
        }

        return await this.postRepository.deletePostById(id);
    }

    async findAllPosts() {
        await this.postRepository.findAllPost();
    }
}