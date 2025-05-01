import {
    ValidateBy,
    ValidationOptions,
    buildMessage,
    ValidationArguments,
} from "class-validator";

export const IsAfterOrEqual = (
    property: string,
    options?: ValidationOptions
): PropertyDecorator =>
    ValidateBy(
        {
            name: "IsAfterOrEqual",
            constraints: [property],
            validator: {
                validate: (value: string, args: ValidationArguments): boolean => {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as Record<string, unknown>)[
                        relatedPropertyName
                    ] as string

                    if (!relatedValue) {
                        return true;
                    }

                    return new Date(value).toISOString() >= new Date(relatedValue).toISOString();
                },
                defaultMessage: buildMessage(
                    (each: string): string =>
                        each + "$property must be after $constraint1",
                    options
                ),
            },
        },
        options
    );
