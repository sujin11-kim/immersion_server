"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterHttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let RegisterHttpExceptionFilter = class RegisterHttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const error = exception.getResponse();
        const curr = new Date();
        const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
        const KR_TIME_DIFF = 18 * 60 * 60 * 1000;
        const kr_curr = new Date(utc + KR_TIME_DIFF);
        response.status(status).json(Object.assign({ isSuccess: true, code: status, kr_curr }, error));
    }
};
RegisterHttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], RegisterHttpExceptionFilter);
exports.RegisterHttpExceptionFilter = RegisterHttpExceptionFilter;
//# sourceMappingURL=register.http-exceptoin.filter.js.map