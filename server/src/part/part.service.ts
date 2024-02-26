import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PartDto } from './dto/part.dto'

@Injectable()
export class PartService {
    constructor(private prisma: PrismaService) {}

    async getAllForGroup( groupId: string ) {
      return this.prisma.part.findMany({
        where: {
            groupId
        }
      })
    }

    async getAllForTeacher( userId: string ) {
        return this.prisma.part.findMany({
          where: {
              userId
          }
        })
      }

    async create(dto: PartDto){
      return this.prisma.part.create({
        data: {
          ...dto
        }
      })
    }

    async update(dto: Partial<PartDto>, partId: string ){
      return this.prisma.part.update({
        where: {
          id: partId
        },
        data: dto
      })
    }

    async delete(partId: string ){
      return this.prisma.part.delete({
        where: {
          id: partId
        }
      })
    }
}
