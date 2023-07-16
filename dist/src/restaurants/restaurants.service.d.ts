import { Repository } from "typeorm";
import { User } from "../../resource/db/entities/User";
import { Restaurant } from "../../resource/db/entities/Restaurant";
export declare class RestaurantsService {
    private readonly userRepository;
    private readonly restaurantRepository;
    constructor(userRepository: Repository<User>, restaurantRepository: Repository<Restaurant>);
    createUserLocation(userIdx: number, latitude: number, longitude: number): Promise<{
        isSuccess: boolean;
        code: number;
        result: number[];
    }>;
    updateUserLocation(userIdx: number, latitude: number, longitude: number): Promise<{
        isSuccess: boolean;
        code: number;
        result: number[];
    }>;
    getrestaurantlist(userIdx: number): Promise<{
        isSuccess: boolean;
        code: number;
        result: Restaurant[];
    }>;
}
