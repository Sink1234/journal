"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../prisma.service");
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    constructor(jwt, userService, prisma, emailService) {
        this.jwt = jwt;
        this.userService = userService;
        this.prisma = prisma;
        this.emailService = emailService;
        this.EXPIRE_DAY_REFRESH_TOKEN = 1;
        this.REFRESH_TOKEN_NAME = 'refreshToken';
    }
    async login(dto) {
        const { password, ...user } = await this.validateUser(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const { password, ...user } = await this.userService.getById(result.id);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    async activeUser(dto) {
        const existingToken = await this.getVerificationTokenByEmail(dto.email);
        if (!existingToken) {
            throw new common_1.BadRequestException('Токен не найден');
        }
        if (existingToken.token !== dto.token) {
            throw new common_1.BadRequestException('Неверный код');
        }
        const hasExpired = new Date(existingToken.expires) < new Date();
        if (hasExpired) {
            await this.prisma.verificationToken.delete({
                where: { id: existingToken.id },
            });
            throw new common_1.BadRequestException('Время токена истекло');
        }
        const existingUser = await this.userService.getByEmail(existingToken.email);
        if (!existingUser) {
            throw new common_1.BadRequestException('Пользователь не найден');
        }
        if (existingUser.emailVerified) {
            throw new common_1.BadRequestException('Почта уже подтверждена');
        }
        const { password, ...activatedUser } = await this.userService.active(existingUser.id);
        await this.prisma.verificationToken.delete({
            where: { id: existingToken.id },
        });
        const tokens = this.issueTokens(activatedUser.id);
        return {
            activatedUser,
            ...tokens,
        };
    }
    async register(dto) {
        const oldUser = await this.userService.getByEmail(dto.email);
        if (oldUser && !oldUser.emailVerified) {
            await this.prisma.user.delete({ where: { id: oldUser.id } });
            return;
        }
        if (oldUser)
            throw new common_1.BadRequestException('Пользователь с такой посчтой уже существует');
        const { email } = await this.userService.create(dto);
        const activeToken = await this.generateActiveToken(email);
        await this.emailService.sendEmail(activeToken.email, activeToken.token);
        return { email };
    }
    async generateActiveToken(email) {
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
        const existingToken = await this.getVerificationTokenByEmail(email);
        if (existingToken) {
            await this.prisma.verificationToken.delete({
                where: { id: existingToken.id },
            });
        }
        const verificationToken = this.prisma.verificationToken.create({
            data: {
                email,
                token,
                expires,
            },
        });
        return verificationToken;
    }
    issueTokens(userId) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    async validateUser(dto) {
        const user = await this.userService.getByEmail(dto.email);
        if (!user)
            throw new common_1.NotFoundException('Такого пользователя нет');
        if (!user.emailVerified)
            throw new common_1.BadRequestException('Подтвердите почту');
        const isValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Неверный пароль');
        return user;
    }
    async getVerificationTokenByEmail(email) {
        try {
            const verificationToken = await this.prisma.verificationToken.findFirst({
                where: { email },
            });
            return verificationToken;
        }
        catch {
            return null;
        }
    }
    addRefreshTokenToResponse(res, refreshToken) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
            secure: true,
            sameSite: 'none',
        });
    }
    removeRefreshTokenFromResponse(res) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: 'localhost',
            expires: new Date(0),
            secure: true,
            sameSite: 'none',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        prisma_service_1.PrismaService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map