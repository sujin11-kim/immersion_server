import { Restaurant } from "./Restaurant";
export declare class Menu {
    menuIdx: number;
    restaurantIdx: number;
    menuName: string;
    menuContent: string | null;
    price: number;
    viewNum: number | null;
    menuImage: string | null;
    saleClosingTime: string;
    restaurantIdx2: Restaurant;
}
