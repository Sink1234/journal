import { TelegramService } from './telegram.service';
import { Action, Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from './telegram.interface';


@Update()
export class TelegramUpdate {
  constructor(
    private readonly telegramService: TelegramService
  ) {}

  // Приветствие
  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply('Привет! Я ваш личный тренер-бот. Чем могу помочь?');
    await this.showMainMenu(ctx);
  }

  // Главное меню
  @Command('menu')
  async showMainMenu(@Ctx() ctx: Context) {
    await this.telegramService.showMainMenu(ctx);
  }

  // Обработка нажатий на кнопки в меню
  @Action(/.*/)
  async onAction(@Ctx() ctx: Context) {
    const callbackQuery = ctx.callbackQuery;

    // Проверяем, что callbackQuery содержит data
    if (callbackQuery && 'data' in callbackQuery) {
      const action = callbackQuery.data;
      await this.telegramService.handleCallbackQuery(ctx, action);
    } else {
      await ctx.reply('Неизвестная команда или формат данных.');
    }
  }

  // Обработка других сообщений (например, текстовых)
  @On('text')
  async onText(@Ctx() ctx: Context) {
    await ctx.reply('Выберите действие из меню /menu');
  }
}