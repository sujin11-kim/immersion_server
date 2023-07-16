import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: number) {
    if (value < 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: "value > .",
        result: { fcmTokens: {} },
      });
    }
    return value;
  }
}
