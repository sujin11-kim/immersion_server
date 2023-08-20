import { RestaurantsService } from "../service/restaurants.service";
import { LocationDto } from "../dto/location.dto";
export declare class RestaurantsController {
    private restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    createUserLocation(locationdto: LocationDto): Promise<import("../../../resource/db/entities/User").User>;
    updateUserLocation(locationdto: LocationDto): Promise<import("../../../resource/db/entities/User").User>;
    getrestaurantlist(userIdx: number): Promise<import("../../../resource/db/entities/Restaurant").Restaurant[]>;
    findMenuByRestaurant(searchWord: string): Promise<any>;
}
