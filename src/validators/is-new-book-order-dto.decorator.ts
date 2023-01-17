import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {NewBookOrderDto} from "../book-order/dto/new-book-order.dto";

@ValidatorConstraint({async: false})
export class IsNewBookOrderDtoConstraint implements ValidatorConstraintInterface {
    validate(value: any) {
        if (!(value instanceof NewBookOrderDto)) {
            return false;
        }
        if (!value.bookId || !value.quantity) {
            return false;
        }
        if (typeof value.bookId !== 'number' || typeof value.quantity !== 'number') {
            return false;
        }
        return true;
    }
}

export function IsNewBookOrderDto(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNewBookOrderDtoConstraint
        });
    };
}

