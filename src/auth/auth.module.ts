// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service'; 
import { AuthController } from './controllers/auth.controller'; 

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.API_SECRET, // Utilize variáveis de ambiente em produção
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
