import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { ActivationDto } from './dto/active.token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: AuthDto, res: Response): Promise<{
        accessToken: string;
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
    register(dto: AuthDto, res: Response): Promise<{
        email: string;
    }>;
    activeAccount(dto: ActivationDto, res: Response): Promise<{
        accessToken: string;
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
    getNewTokens(req: Request, res: Response): Promise<{
        accessToken: string;
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
    logout(res: Response): Promise<boolean>;
}
