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
exports.CustomRestaurantQueryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../../resource/db/entities/User");
const Restaurant_1 = require("../../../resource/db/entities/Restaurant");
const typeorm_2 = require("typeorm");
const calculateDistance_1 = require("../utill/calculateDistance");
let CustomRestaurantQueryRepository = class CustomRestaurantQueryRepository {
    constructor(userRepository, restaurantRepository) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
    }
    async checkExistUser(userIdx) {
        const user = await this.userRepository.findOne({ where: { userIdx } });
        return user;
    }
    async getrestaurantlist(userIdx) {
        const restaurants = await this.restaurantRepository.find();
        const user = await this.userRepository.findOne({ where: { userIdx } });
        const nearbyRestaurantIdxs = [];
        for (const restaurant of restaurants) {
            const distance = (0, calculateDistance_1.calculateDistance)(user.latitude, user.longitude, restaurant.latitude, restaurant.longitude);
            if (distance < 3000) {
                nearbyRestaurantIdxs.push(restaurant.restaurantIdx);
            }
        }
        const nearbyrestaurant = await this.restaurantRepository.find({
            where: {
                restaurantIdx: (0, typeorm_2.In)(nearbyRestaurantIdxs),
            },
        });
        return nearbyrestaurant;
    }
};
CustomRestaurantQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(Restaurant_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomRestaurantQueryRepository);
exports.CustomRestaurantQueryRepository = CustomRestaurantQueryRepository;
//# sourceMappingURL=restaurant-query.repository.js.map