import { Repository } from "typeorm";
import { User } from "mymodel/entities/User";
import { Restaurant } from "mymodel/entities/Restaurant";
export declare class RestaurantsService {
    private readonly userRepository;
    private readonly restaurantRepository;
    constructor(userRepository: Repository<User>, restaurantRepository: Repository<Restaurant>);
    createUserLocation(userIdx: number, latitude: number, longitude: number): Promise<User>;
    updateUserLocation(userIdx: number, latitude: number, longitude: number): Promise<User>;
    getrestaurantlist(userIdx: number): Promise<number[] | {
        isSuccess: boolean;
        code: number;
        kr_curr: Date;
        message: {
            nearbyRestaurantIdxs: number[];
        };
    }>;
}
