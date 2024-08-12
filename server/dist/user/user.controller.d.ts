import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    profile(id: string): Promise<{
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
        statistics: {
            label: string;
            value: string;
        }[];
    }>;
    updateProfile(id: string, dto: UserDto): Promise<{
        email: string;
        name: string;
    }>;
}
