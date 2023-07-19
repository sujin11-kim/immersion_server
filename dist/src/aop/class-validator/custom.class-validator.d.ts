import { ValidatorConstraintInterface, ValidationArguments } from "class-validator";
export declare class IsNotEmptyConstraint implements ValidatorConstraintInterface {
    private statusCode;
    constructor(statusCode: number);
    defaultMessage(args: ValidationArguments): string;
    validate(value: any, args: ValidationArguments): boolean;
}
export declare class IsStringConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class IsEmailConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
