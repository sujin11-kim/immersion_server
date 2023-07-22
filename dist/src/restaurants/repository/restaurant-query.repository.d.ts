import { Restaurant } from "resource/db/entities/Restaurant";
import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
export declare class CustomRestaurantQueryRepository {
    private readonly userRepository;
    private readonly restaurantRepository;
    constructor(userRepository: Repository<User>, restaurantRepository: Repository<Restaurant>);
    saveUser(user: any, locationdto: any): Promise<any>;
    getrestaurantlist(userIdx: number): Promise<Restaurant[]>;
}
