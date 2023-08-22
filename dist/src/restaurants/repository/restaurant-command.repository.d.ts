import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { CreateRestaurantDto } from "../dto/create-restaurant.dto";
import { Restaurant } from "resource/db/entities/Restaurant";
import { RestaurantImage } from "resource/db/entities/RestaurantImage";
export declare class CustomRestaurantCommandRepository {
    private readonly userRepository;
    private errorResponse;
    private readonly restaurantRepository;
    private readonly restaurantImageRepository;
    constructor(userRepository: Repository<User>, errorResponse: ErrorResponse, restaurantRepository: Repository<Restaurant>, restaurantImageRepository: Repository<RestaurantImage>);
    saveUser(user: any, locationdto: any): Promise<any>;
    CreateRestaurant(restaurantInfo: CreateRestaurantDto): Promise<CreateRestaurantDto>;
}
