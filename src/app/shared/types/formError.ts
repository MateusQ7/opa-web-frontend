import { ValidationErrors } from "@angular/forms";

export type FormError = {
    control: string,
    error: string,
    value: ValidationErrors,
    humanMessage: string;
}