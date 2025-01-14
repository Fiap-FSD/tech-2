import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IPost } from "./models/post.interface";
import mongoose, { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post implements IPost {

    @Prop({type: mongoose.Schema.Types.ObjectId})
    id: string;
    @Prop()
    title: string;
    @Prop()
    intro: string;
    @Prop()
    content: string;
    @Prop()
    imageUrl: string;
    @Prop()
    videoUrl: string;
    @Prop()
    createdAt: Date;
    @Prop()
    UpdatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);