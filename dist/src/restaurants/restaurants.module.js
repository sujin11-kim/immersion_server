"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const restaurants_controller_1 = require("./controller/restaurants.controller");
const restaurants_service_1 = require("./service/restaurants.service");
const Restaurant_1 = require("../../resource/db/entities/Restaurant");
const User_1 = require("../../resource/db/entities/User");
const restaurant_implements_1 = require("./interface/restaurant.implements");
const restaurant_command_repository_1 = require("./repository/restaurant-command.repository");
const restaurant_query_repository_1 = require("./repository/restaurant-query.repository");
const error_reponse_1 = require("../aop/exception/error-reponse");
const Menu_1 = require("../../resource/db/entities/Menu");
const RestaurantImage_1 = require("../../resource/db/entities/RestaurantImage");
let RestaurantsModule = class RestaurantsModule {
};
RestaurantsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([User_1.User, Restaurant_1.Restaurant, Menu_1.Menu, RestaurantImage_1.RestaurantImage]),
        ],
        controllers: [restaurants_controller_1.RestaurantsController],
        providers: [
            restaurants_service_1.RestaurantsService,
            restaurant_implements_1.RestaurantIml,
            restaurant_command_repository_1.CustomRestaurantCommandRepository,
            restaurant_query_repository_1.CustomRestaurantQueryRepository,
            error_reponse_1.ErrorResponse,
        ],
    })
], RestaurantsModule);
exports.RestaurantsModule = RestaurantsModule;
//# sourceMappingURL=restaurants.module.js.map