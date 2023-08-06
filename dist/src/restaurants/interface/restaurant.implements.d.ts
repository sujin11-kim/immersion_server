import { RestaurantInterface } from "./restaurant.interface";
import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { LocationDto } from "../dto/location.dto";
import { CustomRestaurantCommandRepository } from "../repository/restaurant-command.repository";
import { CustomRestaurantQueryRepository } from "../repository/restaurant-query.repository";
export declare class RestaurantIml implements RestaurantInterface {
    private readonly customRestaurantCommandRepository;
    private readonly customRestaurantQueryRepository;
    constructor(customRestaurantCommandRepository: CustomRestaurantCommandRepository, customRestaurantQueryRepository: CustomRestaurantQueryRepository);
    createUserLocation(locationdto: LocationDto): Promise<User>;
    updateUserLocation(locationdto: LocationDto): Promise<User>;
    getrestaurantlist(userIdx: number): Promise<Restaurant[]>;
}
