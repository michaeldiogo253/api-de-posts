import { Post } from "@prisma/client";
import { AtualizarPostRequest } from "src/post/dto/atualizar-post.request";
import { CadastrarPostRequest } from "src/post/dto/cadastrar-post.request";

export interface PostRepository {

    findPostById(id: number): Promise<Post>;
    createPost(postDto: CadastrarPostRequest): Promise<Post>;
    findPostsPublished(): Promise<Post[]>;
    publishPostById(id: number): Promise<Post>;
    existsPostById(id: number): Promise<Boolean>;
    deletePostById(id: number):Promise<void>;
    findAllPost(): Promise<Post[]>;
    updatePostEAutorDoPost(request: AtualizarPostRequest): Promise<Post>;
    updatePost(request: AtualizarPostRequest): Promise<Post>;

}

export const PostRepository = Symbol('PostRepository');