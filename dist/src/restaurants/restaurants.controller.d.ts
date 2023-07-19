import { RestaurantsService } from "./restaurants.service";
import { LocationDto } from "./dto/location.dto";
export declare class RestaurantsController {
    private restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    createUserLocation(location: LocationDto): Promise<import("../../resource/db/entities/User").User>;
    updateUserLocation(location: LocationDto): Promise<import("../../resource/db/entities/User").User>;
    getrestaurantlist(userIdx: number): Promise<import("../../resource/db/entities/Restaurant").Restaurant[]>;
}
