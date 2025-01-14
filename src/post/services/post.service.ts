import { Injectable, NotFoundException } from "@nestjs/common";
import { PostRepository } from "../repositories/post.repository";
import { IPost } from "../schemas/models/post.interface";

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) { 
    }

    async getAllPost(limit: number, page: number) {
        return this.postRepository.getAllPost(limit, page);
    }

    async getPostById(postId: string) {
        const post = await this.postRepository.getPostById(postId);
        if(!post) throw new NotFoundException('Post not found');
        return post;
    }

    async createPost(post) {
        return this.postRepository.createPost(post);
    }

    async updatePost(postId: string, post: IPost) {
        return this.postRepository.updatePost(postId, post);
    }

    async deletePost(postId: string) {
        return this.postRepository.deletePost(postId);
    }
}