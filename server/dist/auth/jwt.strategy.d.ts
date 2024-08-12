import { ConfigService } from "@nestjs/config";
import { Strategy } from 'passport-jwt';
import { UserService } from "src/user/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate({ id }: {
        id: string;
    }): Promise<{
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
}
export {};
