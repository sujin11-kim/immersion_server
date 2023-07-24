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
exports.RestaurantIml = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const User_1 = require("../../../resource/db/entities/User");
const Restaurant_1 = require("../../../resource/db/entities/Restaurant");
const restaurant_query_repository_1 = require("../repository/restaurant-query.repository");
const restaurant_command_repository_1 = require("../repository/restaurant-command.repository");
let RestaurantIml = class RestaurantIml {
    constructor(userRepository, restaurantRepository, customUserCommandRepository, customUserQueryRepository) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
        this.customUserCommandRepository = customUserCommandRepository;
        this.customUserQueryRepository = customUserQueryRepository;
    }
    async createUserLocation(locationdto) {
        const user = await this.customUserCommandRepository.checkExistUser(locationdto.userIdx);
        return await this.customUserQueryRepository.saveUser(user, locationdto);
    }
    async updateUserLocation(locationdto) {
        const user = await this.customUserCommandRepository.checkExistUser(locationdto.userIdx);
        return await this.customUserQueryRepository.saveUser(user, locationdto);
    }
    async getrestaurantlist(userIdx) {
        const user = await this.customUserCommandRepository.checkExistUser(userIdx);
        return await this.customUserQueryRepository.getrestaurantlist(userIdx);
    }
};
RestaurantIml = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Restaurant_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        restaurant_command_repository_1.CustomRestaurantCommandRepository,
        restaurant_query_repository_1.CustomRestaurantQueryRepository])
], RestaurantIml);
exports.RestaurantIml = RestaurantIml;
//# sourceMappingURL=restaurant.implements.js.map