import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { PartService } from './part.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { PartDto } from './dto/part.dto';

@Controller('user/parts')
export class PartController {
    constructor(private readonly partService: PartService) {}

    @Get()
    @Auth()
    async getAllForGroup(@CurrentUser('id') userId: string){
      return this.partService.getAllForGroup(userId)
    }

    @Get()
    @Auth()
    async getAllForTeacher(@CurrentUser('id') userId: string){
      return this.partService.getAllForTeacher(userId)
    }
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    @Auth()
    async create(@Body() dto: PartDto){
      return this.partService.create(dto)
    }
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(':id')
    @Auth()
    async update(@Body() dto: PartDto, @Param('id') id: string){
      return this.partService.update(dto, id)
    }
  
    @HttpCode(200)
    @Delete(':id')
    @Auth()
    async delete(@Param('id') id: string){
      return this.partService.delete(id)
    }
}
