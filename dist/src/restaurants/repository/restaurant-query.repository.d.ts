import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { Repository } from "typeorm";
export declare class CustomRestaurantQueryRepository {
    private readonly userRepository;
    private readonly restaurantRepository;
    constructor(userRepository: Repository<User>, restaurantRepository: Repository<Restaurant>);
    checkExistUser(userIdx: number): Promise<User>;
    getrestaurantlist(userIdx: number): Promise<Restaurant[]>;
}
