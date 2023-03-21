import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCheckUsernameonstraint implements ValidatorConstraintInterface {
    constructor(private userService: UserService){}

    validate(userName: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
      return !!!this.userService.searchForId(userName)
    }
}

export function IsCheckUsername(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCheckUsernameonstraint,
        });
    };
}