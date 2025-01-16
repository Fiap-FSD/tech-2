import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { PostService } from "../services/post.service";
import { z } from "zod";
import { ZodValidationPipe } from "src/shared/pipe/zod-validation.pipe";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { LoggingInterceptor } from "src/shared/interceptors/logging.interceptor";



const createPostSchema = z.object({
    title: z.string(),
    intro: z.string(),
    content: z.string(),
    imageUrl: z.string().optional(),
    videoUrl: z.string().optional(),
});

type CreatePost = z.infer<typeof createPostSchema>;

@UseInterceptors(LoggingInterceptor)
@Controller('post')
export class PostController{
    constructor(
        private readonly postService: PostService
    ){}

    //@UseGuards(AuthGuard)
    @Get('search')
    async searchPosts(@Query('keyword') keyword: string) {
        if (!keyword || keyword.trim() === '') {
            throw new BadRequestException('Keyword must be provided');
        }
        return this.postService.searchPosts(keyword);
    }

    @Get()
    async getAllPost(
        @Query('limit')limit: number, 
        @Query('page')page: number) {
        return this.postService.getAllPost(limit, page);
    }

    @Get(':postId')
    async getPostById(@Param('postId' )postId: string) {
        return this.postService.getPostById(postId);
    }

    @UsePipes(new ZodValidationPipe(createPostSchema))
    @Post()
    async createPost(@Body() {title, content, intro, imageUrl, videoUrl}: CreatePost) {
        return this.postService.createPost({title, content, intro, imageUrl, videoUrl});
    }

    @Put(':postId')
    async updatePost(
        @Param('postId') postId: string,
        @Body(new ZodValidationPipe(createPostSchema)) {title, content, intro, imageUrl, videoUrl}: CreatePost) {
        return this.postService.updatePost(postId, {title, content, intro, imageUrl, videoUrl});
    }

    @Delete(':postId')
    async deletePost(@Param('postId') postId: string) {
        return this.postService.deletePost(postId);
    }

}