import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service'; 
import { UserService } from 'src/user/services/user.service'; 

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        return this.userService.createUser(body);
    }
}
