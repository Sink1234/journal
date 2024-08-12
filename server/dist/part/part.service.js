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
exports.PartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PartService = class PartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllForGroup(groupId) {
        return this.prisma.part.findMany({
            where: {
                groupId
            }
        });
    }
    async getAllForTeacher(userId) {
        return this.prisma.part.findMany({
            where: {
                userId
            }
        });
    }
    async create(dto) {
        return this.prisma.part.create({
            data: {
                ...dto
            }
        });
    }
    async update(dto, partId) {
        return this.prisma.part.update({
            where: {
                id: partId
            },
            data: dto
        });
    }
    async delete(partId) {
        return this.prisma.part.delete({
            where: {
                id: partId
            }
        });
    }
};
exports.PartService = PartService;
exports.PartService = PartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PartService);
//# sourceMappingURL=part.service.js.map