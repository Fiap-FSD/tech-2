import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { PostService } from "../services/post.service";
import { z } from "zod";
import { ZodValidationPipe } from "src/shared/pipe/zod-validation.pipe";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { LoggingInterceptor } from "src/shared/interceptors/logging.interceptor";

const createPostSchema = z.object({
    title: z.string(),
    intro: z.string(),
    content: z.string(),
    imageUrl: z.string(),
    videoUrl: z.string(),
    createdAt: z.date(),
    UpdatedAt: z.date(),
});

type CreatePost = z.infer<typeof createPostSchema>;

@UseInterceptors(LoggingInterceptor)
@Controller('post')
export class PostController{
    constructor(
        private readonly postService: PostService
    ){}

    //@UseGuards(AuthGuard)
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
    async createPost(@Body() {title, content, intro, imageUrl, videoUrl, createdAt, UpdatedAt}: CreatePost) {
        return this.postService.createPost({title, content, intro, imageUrl, videoUrl, createdAt, UpdatedAt});
    }

    @Put(':postId')
    async updatePost(
        @Param('postId') postId: string,
        @Body(new ZodValidationPipe(createPostSchema)) {title, content, intro, imageUrl, videoUrl, createdAt, UpdatedAt}: CreatePost) {
        return this.postService.updatePost(postId, {title, content, intro, imageUrl, videoUrl, createdAt, UpdatedAt});
    }

    @Delete(':postId')
    async deletePost(@Param('postId') postId: string) {
        return this.postService.deletePost(postId);
    }
}