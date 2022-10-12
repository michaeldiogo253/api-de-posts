import { AtualizarPostRequest } from './dto/atualizar-post.request';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CadastrarPostRequest } from "./dto/cadastrar-post.request";
import { PostService } from "./pots.service";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get(':id')
    async getPostById(@Param('id') id: string) {
        return await this.postService.findPostById(+id);
    }

    @Post('cadastrar')
    async createDraft(@Body() postRequest: CadastrarPostRequest) {

        return await this.postService.createPost(postRequest);
    }

    @Get('feed')
    async getPublishedPosts() {
        return await this.postService.getPostsPublished();
    }

    @Put('publish/:id')
    async publishPost(@Param('id') id: string) {
        return await this.postService.publishPost(+id);
    }

    @HttpCode(204)
    @Delete('delete/:id')
    async deletePost(@Param('id') id: string) {
        return await this.postService.deletePost(+id);
    }

    @Get('find-all-posts')
    async findAllPosts() {

        return await this.postService.findAllPosts();

    }
    @Put('update')
    async updatePost(@Body() request: AtualizarPostRequest) {

        return await this.postService.updatePost(request);

    }

}