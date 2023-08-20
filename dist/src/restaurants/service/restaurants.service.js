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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const restaurant_implements_1 = require("../interface/restaurant.implements");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantImpl) {
        this.restaurantImpl = restaurantImpl;
    }
    async createUserLocation(locationdto) {
        return await this.restaurantImpl.createUserLocation(locationdto);
    }
    async updateUserLocation(locationdto) {
        return await this.restaurantImpl.updateUserLocation(locationdto);
    }
    async getrestaurantlist(userIdx) {
        return await this.restaurantImpl.getrestaurantlist(userIdx);
    }
    async findMenu(searchWord) {
        return await this.restaurantImpl.findMenu(searchWord);
    }
};
RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [restaurant_implements_1.RestaurantIml])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map