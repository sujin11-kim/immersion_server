import { RestaurantInterface } from "./restaurant.interface";
import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { LocationDto } from "../dto/location.dto";
import { CustomRestaurantCommandRepository } from "../repository/restaurant-command.repository";
import { CustomRestaurantQueryRepository } from "../repository/restaurant-query.repository";
import { ErrorResponse } from "src/aop/exception/error-reponse";
import { CreateRestaurantDto } from "../dto/create-restaurant.dto";
export declare class RestaurantIml implements RestaurantInterface {
    private readonly customRestaurantCommandRepository;
    private readonly customRestaurantQueryRepository;
    private errorResponse;
    constructor(customRestaurantCommandRepository: CustomRestaurantCommandRepository, customRestaurantQueryRepository: CustomRestaurantQueryRepository, errorResponse: ErrorResponse);
    createUserLocation(locationdto: LocationDto): Promise<User>;
    updateUserLocation(locationdto: LocationDto): Promise<User>;
    getrestaurantlist(userIdx: number): Promise<Restaurant[]>;
    findMenu(searchWord: string): Promise<any>;
    CreateRestaurant(restaurantInfo: CreateRestaurantDto, userIdx: number): Promise<CreateRestaurantDto>;
}
