import { RestaurantInterface } from "./restaurant.interface";
import { Repository } from "typeorm";
import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { LocationDto } from "../dto/location.dto";
import { CustomRestaurantQueryRepository } from "../repository/restaurant-query.repository";
import { CustomRestaurantCommandRepository } from "../repository/restaurant-command.repository";
export declare class RestaurantIml implements RestaurantInterface {
    private readonly userRepository;
    private readonly restaurantRepository;
    private readonly customUserCommandRepository;
    private readonly customUserQueryRepository;
    constructor(userRepository: Repository<User>, restaurantRepository: Repository<Restaurant>, customUserCommandRepository: CustomRestaurantCommandRepository, customUserQueryRepository: CustomRestaurantQueryRepository);
    createUserLocation(locationdto: LocationDto): Promise<User>;
    updateUserLocation(locationdto: LocationDto): Promise<User>;
    getrestaurantlist(userIdx: number): Promise<Restaurant[]>;
}
