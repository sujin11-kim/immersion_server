"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let SuccessInterceptor = class SuccessInterceptor {
    intercept(context, next) {
        const curr = new Date();
        const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
        const KR_TIME_DIFF = 18 * 60 * 60 * 1000;
        const kr_curr = new Date(utc + KR_TIME_DIFF);
        return next.handle().pipe((0, operators_1.map)((data) => {
            const response = context.switchToHttp().getResponse();
            if (response.statusCode === common_1.HttpStatus.OK) {
                return { isSuccess: true, code: common_1.HttpStatus.OK, kr_curr, message: data };
            }
            else {
                return { isSuccess: false, code: common_1.HttpStatus.UNAUTHORIZED, kr_curr };
            }
        }));
    }
};
SuccessInterceptor = __decorate([
    (0, common_1.Injectable)()
], SuccessInterceptor);
exports.SuccessInterceptor = SuccessInterceptor;
//# sourceMappingURL=success.interceptor.js.map