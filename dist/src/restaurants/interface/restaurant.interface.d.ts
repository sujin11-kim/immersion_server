import { LocationDto } from "../dto/location.dto";
import { User } from "../../../resource/db/entities/User";
import { Restaurant } from "resource/db/entities/Restaurant";
export interface RestaurantInterface {
    createUserLocation(locationdto: LocationDto): Promise<User>;
    updateUserLocation(locationdto: LocationDto): Promise<User>;
    getrestaurantlist(userIdx: number): Promise<Restaurant[]>;
    findMenu(restaurant: string): Promise<any>;
}
