import { Menu } from "./Menu";
import { User } from "./User";
import { RestaurantImage } from "./RestaurantImage";
export declare class Restaurant {
    restaurantIdx: number;
    userIdx: number;
    restaurantName: string | null;
    openTime: string | null;
    closeTime: string | null;
    telNum: string | null;
    isAuthorized: boolean | null;
    latitude: number | null;
    longitude: number | null;
    restaurantIntro: string | null;
    isPostedToday: boolean | null;
    userIdx2: User;
    menus: Menu[];
    Images: RestaurantImage[];
}
