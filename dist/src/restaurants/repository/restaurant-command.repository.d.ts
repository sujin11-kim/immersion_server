import { Restaurant } from "resource/db/entities/Restaurant";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
export declare class CustomRestaurantCommandRepository {
    private readonly userRepository;
    private readonly restaurantRepository;
    constructor(userRepository: Repository<User>, restaurantRepository: Repository<Restaurant>);
    checkExistUser(userIdx: number): Promise<User>;
}
