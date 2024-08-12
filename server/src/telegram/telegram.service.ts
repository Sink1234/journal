import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Telegraf } from 'telegraf';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TelegramService {
  private readonly bot: Telegraf;
  private readonly logger = new Logger(TelegramService.name);

  constructor(private prisma: PrismaService, private schedulerRegistry: SchedulerRegistry) {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
  }

  // Показ главного меню
  async showMainMenu(ctx: any) {
    const buttons = [
      { text: 'Записаться на первое занятие', callback_data: 'book_session' },
      { text: 'Курсы', callback_data: 'courses' },
      { text: 'Составление индивидуальной программы', callback_data: 'custom_program' },
    ];

    await ctx.reply('Главное меню:', {
      reply_markup: {
        inline_keyboard: [buttons.map(button => ([button]))],
      },
    });
  }

  // Обработка нажатий на кнопки в меню
  async handleCallbackQuery(ctx: any, action: string) {
    if (action === 'book_session') {
      await this.handleBooking(ctx);
    } else if (action === 'courses') {
      await this.showCoursesMenu(ctx);
    } else if (action === 'custom_program') {
      await ctx.reply('Напишите тренеру для составления индивидуальной программы.');
    } else if (action.startsWith('course_')) {
      const courseId = action.split('_')[1];
      await this.showCourseContent(ctx, courseId);
    } else {
      await ctx.reply('Неизвестная команда.');
    }
  }

  // Запись на первое занятие
  async handleBooking(ctx: any) {
    const availableDates = await this.getAvailableDates();
    await ctx.reply('Выберите день:', {
      reply_markup: {
        inline_keyboard: availableDates.map(date => [{ text: date, callback_data: `date_${date}` }]),
      },
    });
  }

  // Получение доступных дат
  async getAvailableDates(): Promise<string[]> {
    // Логика для получения доступных дат из базы данных
    return ['2024-06-25', '2024-06-26', '2024-06-27'];
  }

  // Курсы
  async showCoursesMenu(ctx: any) {
    const buttons = [
      { text: 'Мужские курсы', callback_data: 'male_courses' },
      { text: 'Женские курсы', callback_data: 'female_courses' },
    ];

    await ctx.reply('Выберите тип курса:', {
      reply_markup: {
        inline_keyboard: [buttons.map(button => ([button]))],
      },
    });
  }

  // Показ содержимого курса
  async showCourseContent(ctx: any, courseId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      select: { name: true, description: true, youtubeLink: true },
    });

    if (course) {
      await ctx.replyWithMarkdown(`*${course.name}*\n\n${course.description}\n\n[Смотреть видео на YouTube](${course.youtubeLink})`);
    } else {
      await ctx.reply('Курс не найден.');
    }
  }
}