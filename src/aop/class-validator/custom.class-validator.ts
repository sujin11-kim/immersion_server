import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from "class-validator";

@ValidatorConstraint({ name: "isNotEmpty", async: false })
export class IsNotEmptyConstraint implements ValidatorConstraintInterface {
  constructor(private statusCode: number) {}

  defaultMessage(args: ValidationArguments) {
    return `Property ${args.property} should not be empty.`;
  }

  validate(value: any, args: ValidationArguments) {
    console.log(this.statusCode);
    args.constraints[0].context.statusCode = this.statusCode;
    return value !== null && value !== undefined && value !== "";
  }
}

@ValidatorConstraint({ name: "isString", async: false })
export class IsStringConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === "string";
  }

  defaultMessage(args: ValidationArguments) {
    return `Property ${args.property} should be a string.`;
  }
}

@ValidatorConstraint({ name: "isEmail", async: false })
export class IsEmailConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    // Add your email validation logic here
    return true; // For simplicity, assuming all emails are valid
  }

  defaultMessage(args: ValidationArguments) {
    return `Property ${args.property} should be a valid email address.`;
  }
}
