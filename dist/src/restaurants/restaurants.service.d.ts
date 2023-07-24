import { User } from "../../resource/db/entities/User";
import { Restaurant } from "../../resource/db/entities/Restaurant";
import { LocationDto } from "./dto/location.dto";
import { RestaurantIml } from "./interface/restaurant.implements";
export declare class RestaurantsService {
    private restaurantImpl;
    constructor(restaurantImpl: RestaurantIml);
    createUserLocation(locationdto: LocationDto): Promise<User>;
    updateUserLocation(locationdto: LocationDto): Promise<User>;
    getrestaurantlist(userIdx: number): Promise<Restaurant[]>;
}
