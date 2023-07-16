import { RestaurantsService } from "./restaurants.service";
import { LocationDto } from "./dto/location.dto";
export declare class RestaurantsController {
    private restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    createUserLocation(location: LocationDto): Promise<{
        isSuccess: boolean;
        code: number;
        result: number[];
    }>;
    updateUserLocation(location: LocationDto): Promise<{
        isSuccess: boolean;
        code: number;
        result: number[];
    }>;
    getrestaurantlist(userIdx: number): Promise<{
        isSuccess: boolean;
        code: number;
        result: import("../../resource/db/entities/Restaurant").Restaurant[];
    }>;
}
