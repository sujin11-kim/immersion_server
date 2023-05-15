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
exports.RestaurantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const restaurants_service_1 = require("./restaurants.service");
const swagger_2 = require("@nestjs/swagger");
const common_3 = require("@nestjs/common");
const location_dto_1 = require("./dto/location.dto");
let RestaurantsController = class RestaurantsController {
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    createUserLocation(location) {
        const { userIdx, latitude, longitude } = location;
        return this.restaurantsService.createUserLocation(userIdx, latitude, longitude);
    }
    updateUserLocation(location) {
        const { userIdx, latitude, longitude } = location;
        return this.restaurantsService.updateUserLocation(userIdx, latitude, longitude);
    }
    getrestaurantlist(userIdx) {
        return this.restaurantsService.getrestaurantlist(userIdx);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "API No. 5-1 유저 경도위도 저장" }),
    (0, common_2.Post)("mylocation"),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.LocationDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "createUserLocation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "API No. 5-2유저 경도위도 업데이트" }),
    (0, common_2.Patch)("mylocation"),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.LocationDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "updateUserLocation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "API No. 5-3 현재 user 3km이내 음식점 정보 조회" }),
    (0, common_1.Get)("list/:userIdx"),
    __param(0, (0, common_1.Param)("userIdx")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "getrestaurantlist", null);
RestaurantsController = __decorate([
    (0, swagger_2.ApiTags)("Restaurants"),
    (0, common_3.Controller)("restaurants"),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
exports.RestaurantsController = RestaurantsController;
//# sourceMappingURL=restaurants.controller.js.map