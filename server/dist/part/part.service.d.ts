import { PrismaService } from 'src/prisma.service';
import { PartDto } from './dto/part.dto';
export declare class PartService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllForGroup(groupId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        partName: string;
        date: Date;
        number: number;
        room: number;
        userId: string;
        groupId: string;
    }[]>;
    getAllForTeacher(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        partName: string;
        date: Date;
        number: number;
        room: number;
        userId: string;
        groupId: string;
    }[]>;
    create(dto: PartDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        partName: string;
        date: Date;
        number: number;
        room: number;
        userId: string;
        groupId: string;
    }>;
    update(dto: Partial<PartDto>, partId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        partName: string;
        date: Date;
        number: number;
        room: number;
        userId: string;
        groupId: string;
    }>;
    delete(partId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        partName: string;
        date: Date;
        number: number;
        room: number;
        userId: string;
        groupId: string;
    }>;
}
