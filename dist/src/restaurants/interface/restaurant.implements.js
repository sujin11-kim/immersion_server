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
const error_reponse_1 = require("../../aop/exception/error-reponse");
const calculateDistance_1 = require("../utill/calculateDistance");
let RestaurantIml = class RestaurantIml {
    constructor(customRestaurantCommandRepository, customRestaurantQueryRepository, errorResponse) {
        this.customRestaurantCommandRepository = customRestaurantCommandRepository;
        this.customRestaurantQueryRepository = customRestaurantQueryRepository;
        this.errorResponse = errorResponse;
    }
    async createUserLocation(locationdto) {
        const user = await this.customRestaurantQueryRepository.checkExistUser(locationdto.userIdx);
        if (!user) {
            throw this.errorResponse.notExistUser();
        }
        return await this.customRestaurantCommandRepository.saveUser(user, locationdto);
    }
    async updateUserLocation(locationdto) {
        const user = await this.customRestaurantQueryRepository.checkExistUser(locationdto.userIdx);
        if (!user) {
            throw this.errorResponse.notExistUser();
        }
        return await this.customRestaurantCommandRepository.saveUser(user, locationdto);
    }
    async getrestaurantlist(userIdx) {
        const restaurants = await this.customRestaurantQueryRepository.getAllResturant();
        const user = await this.customRestaurantQueryRepository.checkExistUser(userIdx);
        const nearbyRestaurantIdxs = [];
        for (const restaurant of restaurants) {
            const distance = (0, calculateDistance_1.calculateDistance)(user.latitude, user.longitude, restaurant.latitude, restaurant.longitude);
            if (distance < 3000) {
                nearbyRestaurantIdxs.push(restaurant.restaurantIdx);
            }
        }
        return await this.customRestaurantQueryRepository.getNearByResturants(nearbyRestaurantIdxs);
    }
    async findMenu(searchWord) {
        let menuList = await this.customRestaurantQueryRepository.findMenuByRestaurant(searchWord);
        if (menuList.length === 0) {
            this.errorResponse.notFoundSearch();
        }
        return { menuList };
    }
};
RestaurantIml = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurant_command_repository_1.CustomRestaurantCommandRepository,
        restaurant_query_repository_1.CustomRestaurantQueryRepository,
        error_reponse_1.ErrorResponse])
], RestaurantIml);
exports.RestaurantIml = RestaurantIml;
//# sourceMappingURL=restaurant.implements.js.map