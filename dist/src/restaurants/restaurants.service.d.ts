import { Repository } from "typeorm";
import { User } from "../../resource/db/entities/User";
import { Restaurant } from "../../resource/db/entities/Restaurant";
export declare class RestaurantsService {
    private readonly userRepository;
    private readonly restaurantRepository;
    constructor(userRepository: Repository<User>, restaurantRepository: Repository<Restaurant>);
    createUserLocation(userIdx: number, latitude: number, longitude: number): Promise<User>;
    updateUserLocation(userIdx: number, latitude: number, longitude: number): Promise<User>;
    getrestaurantlist(userIdx: number): Promise<Restaurant[]>;
}
