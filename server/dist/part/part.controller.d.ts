import { PartService } from './part.service';
import { PartDto } from './dto/part.dto';
export declare class PartController {
    private readonly partService;
    constructor(partService: PartService);
    getAllForGroup(userId: string): Promise<{
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
    update(dto: PartDto, id: string): Promise<{
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
    delete(id: string): Promise<{
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
