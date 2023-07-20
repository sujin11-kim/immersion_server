import { PipeTransform } from "@nestjs/common";
export declare class MaxLengthPipe implements PipeTransform {
    transform(content: string): void;
}
