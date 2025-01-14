export interface IPost {
    id?: string;
    title: string;
    intro: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    createdAt: Date;
    UpdatedAt?: Date;
}