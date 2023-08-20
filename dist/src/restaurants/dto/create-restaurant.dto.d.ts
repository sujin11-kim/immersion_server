import { Restaurant } from "../../../resource/db/entities/Restaurant";
declare const CreateRestaurantDto_base: import("@nestjs/common").Type<Pick<Restaurant, "userIdx" | "restaurantName" | "openTime" | "closeTime" | "telNum" | "restaurantIntro">>;
export declare class CreateRestaurantDto extends CreateRestaurantDto_base {
    userIdx: number;
    restaurantName: string;
    openTime: string;
    closeTime: string;
    telNum: string;
    restaurantIntro: string;
    image: string[];
}
export {};
