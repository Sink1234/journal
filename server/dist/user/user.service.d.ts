import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { UserDto } from './dto/user.dto';
export declare class UserService {
    private prisma;
    [x: string]: any;
    constructor(prisma: PrismaService);
    getById(id: string): Promise<{
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
        password: string;
        groupId: string;
        groupCuratorId: string;
        groupHeadmenId: string;
        markPartId: string;
    }>;
    getByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
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
        password: string;
        groupId: string;
        groupCuratorId: string;
        groupHeadmenId: string;
        markPartId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getProfile(id: string): Promise<{
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
    create(dto: AuthDto): Promise<{
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
        password: string;
        groupId: string;
        groupCuratorId: string;
        groupHeadmenId: string;
        markPartId: string;
    }>;
    active(id: string): Promise<{
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
        password: string;
        groupId: string;
        groupCuratorId: string;
        groupHeadmenId: string;
        markPartId: string;
    }>;
    update(id: string, dto: UserDto): Promise<{
        email: string;
        name: string;
    }>;
}
