import { LocationDto } from "../dto/location.dto";
import { RestaurantIml } from "../interface/restaurant.implements";
import { CreateRestaurantDto } from "../dto/create-restaurant.dto";
export declare class RestaurantsService {
    private restaurantImpl;
    constructor(restaurantImpl: RestaurantIml);
    createUserLocation(locationdto: LocationDto): Promise<import("../../../resource/db/entities/User").User>;
    updateUserLocation(locationdto: LocationDto): Promise<import("../../../resource/db/entities/User").User>;
    getrestaurantlist(userIdx: number): Promise<import("../../../resource/db/entities/Restaurant").Restaurant[]>;
    findMenu(searchWord: string): Promise<any>;
    CreateRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<CreateRestaurantDto>;
}
