"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSuccessInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let RegisterSuccessInterceptor = class RegisterSuccessInterceptor {
    intercept(context, next) {
        const curr = new Date();
        const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
        const KR_TIME_DIFF = 18 * 60 * 60 * 1000;
        const kr_curr = new Date(utc + KR_TIME_DIFF);
        return next.handle().pipe((0, operators_1.map)((data) => ({
            isSuccess: true,
            code: 1000,
            result: { userIdx: data },
        })));
    }
};
RegisterSuccessInterceptor = __decorate([
    (0, common_1.Injectable)()
], RegisterSuccessInterceptor);
exports.RegisterSuccessInterceptor = RegisterSuccessInterceptor;
//# sourceMappingURL=register.success.interceptor.js.map