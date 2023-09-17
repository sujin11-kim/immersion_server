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
const restaurants_service_1 = require("../service/restaurants.service");
const swagger_2 = require("@nestjs/swagger");
const common_3 = require("@nestjs/common");
const location_dto_1 = require("../dto/location.dto");
const http_exception_filter_1 = require("../../aop/exception/http-exception.filter");
const success_interceptor_1 = require("../../aop/interceptors/success.interceptor");
const create_restaurant_dto_1 = require("../dto/create-restaurant.dto");
const jwt_guard_1 = require("../../auth/utils/jwt/jwt.guard");
const user_decorator_1 = require("../../aop/decorators/user.decorator");
const user_login_dto_1 = require("../../users/dto/user-login.dto");
let RestaurantsController = class RestaurantsController {
    constructor(restaurantsService) {
        this.restaurantsService = restaurantsService;
    }
    createUserLocation(locationdto) {
        return this.restaurantsService.createUserLocation(locationdto);
    }
    updateUserLocation(locationdto) {
        return this.restaurantsService.updateUserLocation(locationdto);
    }
    getrestaurantlist(userIdx) {
        return this.restaurantsService.getrestaurantlist(userIdx);
    }
    findMenuByRestaurant(searchWord) {
        return this.restaurantsService.findMenu(searchWord);
    }
    create(createRestaurantDto, user) {
        return this.restaurantsService.CreateRestaurant(createRestaurantDto, user.userIdx);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "API No. 5-1 유저 경도위도 저장" }),
    (0, common_2.Post)("mylocationsave"),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [location_dto_1.LocationDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "createUserLocation", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "API No. 5-2유저 경도위도 업데이트" }),
    (0, common_2.Patch)("mylocationupdate"),
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
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "식당 및 메뉴 검색" }),
    (0, common_1.Get)("/search/:searchWord"),
    __param(0, (0, common_1.Param)("searchWord")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "findMenuByRestaurant", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "식당 정보 등록" }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_2.Post)("/create"),
    __param(0, (0, common_3.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurant_dto_1.CreateRestaurantDto,
        user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", void 0)
], RestaurantsController.prototype, "create", null);
RestaurantsController = __decorate([
    (0, swagger_2.ApiTags)("Restaurants"),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    (0, common_3.Controller)("restaurants"),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantsService])
], RestaurantsController);
exports.RestaurantsController = RestaurantsController;
//# sourceMappingURL=restaurants.controller.js.map