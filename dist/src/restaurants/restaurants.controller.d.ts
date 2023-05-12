import { RestaurantsService } from "./restaurants.service";
import { LocationDto } from "./dto/location.dto";
export declare class RestaurantsController {
    private restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    createUserLocation(location: LocationDto): Promise<import("../../mymodel/entities/User").User>;
    updateUserLocation(location: LocationDto): Promise<import("../../mymodel/entities/User").User>;
}
