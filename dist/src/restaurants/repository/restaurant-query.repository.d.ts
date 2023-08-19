import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { Repository } from "typeorm";
export declare class CustomRestaurantQueryRepository {
    private readonly userRepository;
    private readonly restaurantRepository;
    constructor(userRepository: Repository<User>, restaurantRepository: Repository<Restaurant>);
    getAllResturant(): Promise<Restaurant[]>;
    checkExistUser(userIdx: number): Promise<User>;
    getNearByResturants(nearbyRestaurantIdxs: number[]): Promise<Restaurant[]>;
}
