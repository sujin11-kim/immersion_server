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
const User_1 = require("../../../resource/db/entities/User");
const typeorm_2 = require("typeorm");
const error_reponse_1 = require("../../aop/exception/error-reponse");
const Restaurant_1 = require("../../../resource/db/entities/Restaurant");
const RestaurantImage_1 = require("../../../resource/db/entities/RestaurantImage");
let CustomRestaurantCommandRepository = class CustomRestaurantCommandRepository {
    constructor(userRepository, errorResponse, restaurantRepository, restaurantImageRepository) {
        this.userRepository = userRepository;
        this.errorResponse = errorResponse;
        this.restaurantRepository = restaurantRepository;
        this.restaurantImageRepository = restaurantImageRepository;
    }
    async saveUser(user, locationdto) {
        user.latitude = locationdto.latitude;
        user.longitude = locationdto.longitude;
        return await this.userRepository.save(user);
    }
    async CreateRestaurant(restaurantInfo) {
        const queryRunner = this.restaurantRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            const restaurant = queryRunner.manager.getRepository(Restaurant_1.Restaurant).create();
            restaurant.userIdx = restaurantInfo.userIdx;
            restaurant.restaurantName = restaurantInfo.restaurantName;
            restaurant.openTime = restaurantInfo.openTime;
            restaurant.closeTime = restaurantInfo.closeTime;
            restaurant.telNum = restaurantInfo.telNum;
            restaurant.restaurantIntro = restaurantInfo.restaurantIntro;
            await queryRunner.manager.getRepository(Restaurant_1.Restaurant).save(restaurant);
            const restaurantFromDb = await this.restaurantRepository.findOne({
                where: { restaurantName: restaurantInfo.restaurantName },
            });
            const imagePromises = restaurantInfo.image.map(async (imagePath) => {
                const image = this.restaurantImageRepository.create();
                image.restaurantIdx = restaurantFromDb.restaurantIdx;
                image.imagePath = imagePath;
                await this.restaurantImageRepository.save(image);
            });
            await Promise.all(imagePromises);
            await queryRunner.commitTransaction();
            return Object.assign({}, restaurantInfo);
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
};
CustomRestaurantCommandRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(Restaurant_1.Restaurant)),
    __param(3, (0, typeorm_1.InjectRepository)(RestaurantImage_1.RestaurantImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        error_reponse_1.ErrorResponse,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CustomRestaurantCommandRepository);
exports.CustomRestaurantCommandRepository = CustomRestaurantCommandRepository;
//# sourceMappingURL=restaurant-command.repository.js.map