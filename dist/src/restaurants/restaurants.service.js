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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_2 = require("@nestjs/common");
const User_1 = require("../../mymodel/entities/User");
const Restaurant_1 = require("../../mymodel/entities/Restaurant");
let RestaurantsService = class RestaurantsService {
    constructor(userRepository, restaurantRepository) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
    }
    async createUserLocation(userIdx, latitude, longitude) {
        const user = await this.userRepository.findOne({ where: { userIdx } });
        console.log("유저 정보:", user);
        if (!user) {
            throw new common_1.HttpException({ message: "존재하지 않는 id 입니다." }, 201);
        }
        user.latitude = latitude;
        user.longitude = longitude;
        return await this.userRepository.save(user);
    }
    async updateUserLocation(userIdx, latitude, longitude) {
        const user = await this.userRepository.findOne({ where: { userIdx } });
        user.latitude = latitude;
        user.longitude = longitude;
        return await this.userRepository.save(user);
    }
};
RestaurantsService = __decorate([
    (0, common_2.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(Restaurant_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], RestaurantsService);
exports.RestaurantsService = RestaurantsService;
//# sourceMappingURL=restaurants.service.js.map