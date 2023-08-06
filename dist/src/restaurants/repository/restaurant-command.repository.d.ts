import { User } from "resource/db/entities/User";
import { Repository } from "typeorm";
export declare class CustomRestaurantCommandRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    saveUser(user: any, locationdto: any): Promise<any>;
}
