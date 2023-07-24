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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRestaurantCommandRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Restaurant_1 = require("../../../resource/db/entities/Restaurant");
const User_1 = require("../../../resource/db/entities/User");
const typeorm_2 = require("typeorm");
let CustomRestaurantCommandRepository = class CustomRestaurantCommandRepository {
    constructor(userRepository, restaurantRepository) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
    }
    async checkExistUser(userIdx) {
        const user = await this.userRepository.findOne({ where: { userIdx } });
        if (!user) {
            throw new common_1.BadRequestException({
                statusCode: 2100,
                message: "존재하지 않는 사용자 입니다.",
            });
        }
        return user;
    }
};
CustomRestaurantCommandRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Restaurant_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomRestaurantCommandRepository);
exports.CustomRestaurantCommandRepository = CustomRestaurantCommandRepository;
//# sourceMappingURL=restaurant-command.repository.js.map