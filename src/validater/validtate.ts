export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
    if (value) { return undefined; }
    else { return "field is required"; }

}

export const maxlength: (length: number) => FieldValidatorType = (length) => (value)  => {
    if (value.length > length) return `Max length is ${length} symbols`;

    return undefined;
}