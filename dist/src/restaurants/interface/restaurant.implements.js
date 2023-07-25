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
exports.RestaurantIml = void 0;
const common_1 = require("@nestjs/common");
const restaurant_command_repository_1 = require("../repository/restaurant-command.repository");
const restaurant_query_repository_1 = require("../repository/restaurant-query.repository");
let RestaurantIml = class RestaurantIml {
    constructor(customUserCommandRepository, customUserQueryRepository) {
        this.customUserCommandRepository = customUserCommandRepository;
        this.customUserQueryRepository = customUserQueryRepository;
    }
    async createUserLocation(locationdto) {
        const user = await this.customUserQueryRepository.checkExistUser(locationdto.userIdx);
        return await this.customUserCommandRepository.saveUser(user, locationdto);
    }
    async updateUserLocation(locationdto) {
        const user = await this.customUserQueryRepository.checkExistUser(locationdto.userIdx);
        return await this.customUserCommandRepository.saveUser(user, locationdto);
    }
    async getrestaurantlist(userIdx) {
        const user = await this.customUserQueryRepository.checkExistUser(userIdx);
        return await this.customUserQueryRepository.getrestaurantlist(userIdx);
    }
};
RestaurantIml = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurant_command_repository_1.CustomRestaurantCommandRepository,
        restaurant_query_repository_1.CustomRestaurantQueryRepository])
], RestaurantIml);
exports.RestaurantIml = RestaurantIml;
//# sourceMappingURL=restaurant.implements.js.map