// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { User, UserSchema } from './schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserRepository, UserService],
    exports: [UserService],
})
export class UserModule {}
