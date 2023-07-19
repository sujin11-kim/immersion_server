"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmailConstraint = exports.IsStringConstraint = exports.IsNotEmptyConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsNotEmptyConstraint = class IsNotEmptyConstraint {
    constructor(statusCode) {
        this.statusCode = statusCode;
    }
    defaultMessage(args) {
        return `Property ${args.property} should not be empty.`;
    }
    validate(value, args) {
        console.log(this.statusCode);
        args.constraints[0].context.statusCode = this.statusCode;
        return value !== null && value !== undefined && value !== "";
    }
};
IsNotEmptyConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "isNotEmpty", async: false }),
    __metadata("design:paramtypes", [Number])
], IsNotEmptyConstraint);
exports.IsNotEmptyConstraint = IsNotEmptyConstraint;
let IsStringConstraint = class IsStringConstraint {
    validate(value, args) {
        return typeof value === "string";
    }
    defaultMessage(args) {
        return `Property ${args.property} should be a string.`;
    }
};
IsStringConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "isString", async: false })
], IsStringConstraint);
exports.IsStringConstraint = IsStringConstraint;
let IsEmailConstraint = class IsEmailConstraint {
    validate(value, args) {
        return true;
    }
    defaultMessage(args) {
        return `Property ${args.property} should be a valid email address.`;
    }
};
IsEmailConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "isEmail", async: false })
], IsEmailConstraint);
exports.IsEmailConstraint = IsEmailConstraint;
//# sourceMappingURL=custom.class-validator.js.map