import { User } from "resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
import { Repository } from "typeorm";
import { Menu } from "resource/db/entities/Menu";
export declare class CustomRestaurantQueryRepository {
    private readonly userRepository;
    private readonly restaurantRepository;
    private readonly menuRepository;
    constructor(userRepository: Repository<User>, restaurantRepository: Repository<Restaurant>, menuRepository: Repository<Menu>);
    getAllResturant(): Promise<Restaurant[]>;
    checkExistUser(userIdx: number): Promise<User>;
    getNearByResturants(nearbyRestaurantIdxs: number[]): Promise<Restaurant[]>;
    findMenuByRestaurant(searchWord: string): Promise<any[]>;
}
