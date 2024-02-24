import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';
import { UserDto } from './dto/user.dto';
import { startOfDay, subDays } from 'date-fns';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(private prisma: PrismaService) {}

  async getById( id: string ) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  getByEmail(email:string){
    return this.prisma.user.findUnique({
      where: {
        email
      },
    })
  }

  async getProfile(id: string){
    const profile = await this.getById(id)

    const name = profile.name
    const group = profile.groupId
    const sc_name = profile.second_name
    const surname = profile.surname
    
    const todayStart = startOfDay(new Date())
    const weekStart = startOfDay(subDays(new Date(), 7))

    const { password, ...rest } = profile

    return{
      user: rest,
      statistics: [
        {label: 'name', value: name},
        {label: 'second name', value: sc_name},
        {label: 'name', value: surname},
        {label: 'group', value: group},
      ]
    }
  }

 

  async create(dto: AuthDto ){
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password)
    }

    return this.prisma.user.create({
      data: user,
      
    })
  }

  async update(id: string, dto: UserDto ){
    let data = dto

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password)}
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        name: true,
        email: true
      }
    })
  }

  
}
