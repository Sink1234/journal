import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/email/email.service';
import { ActivationDto } from './dto/active.token.dto';
export declare class AuthService {
    private jwt;
    private userService;
    private prisma;
    private emailService;
    EXPIRE_DAY_REFRESH_TOKEN: number;
    REFRESH_TOKEN_NAME: string;
    constructor(jwt: JwtService, userService: UserService, prisma: PrismaService, emailService: EmailService);
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            post: import(".prisma/client").$Enums.Post;
            name: string;
            second_name: string;
            surname: string;
            dateOfBirthday: string;
            photo: string;
            email: string;
            emailVerified: Date;
            groupId: string;
            groupCuratorId: string;
            groupHeadmenId: string;
            markPartId: string;
        };
    }>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            post: import(".prisma/client").$Enums.Post;
            name: string;
            second_name: string;
            surname: string;
            dateOfBirthday: string;
            photo: string;
            email: string;
            emailVerified: Date;
            groupId: string;
            groupCuratorId: string;
            groupHeadmenId: string;
            markPartId: string;
        };
    }>;
    activeUser(dto: ActivationDto): Promise<{
        accessToken: string;
        refreshToken: string;
        activatedUser: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            post: import(".prisma/client").$Enums.Post;
            name: string;
            second_name: string;
            surname: string;
            dateOfBirthday: string;
            photo: string;
            email: string;
            emailVerified: Date;
            groupId: string;
            groupCuratorId: string;
            groupHeadmenId: string;
            markPartId: string;
        };
    }>;
    register(dto: AuthDto): Promise<{
        email: string;
    }>;
    private generateActiveToken;
    private issueTokens;
    private validateUser;
    private getVerificationTokenByEmail;
    addRefreshTokenToResponse(res: Response, refreshToken: string): void;
    removeRefreshTokenFromResponse(res: Response): void;
}
