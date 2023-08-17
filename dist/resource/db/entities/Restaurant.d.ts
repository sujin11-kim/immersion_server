import { Meun } from "./Meun";
import { User } from "./User";
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
    meuns: Meun[];
}
