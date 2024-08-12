import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.update';
import { PrismaService } from 'src/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),  // Подключаем ScheduleModule
  ],
  providers: [TelegramUpdate, TelegramService, PrismaService],
})
export class TelegramModule {}
 