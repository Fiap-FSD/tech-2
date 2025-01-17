import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema'; 

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async create(data: Partial<User>): Promise<User> {
        return new this.userModel(data).save();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
}
