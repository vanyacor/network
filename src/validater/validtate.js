export const required = (value) => {
    if (value) { return undefined; }
    else { return "field is required"; }

}

export const maxlength = (length) => (value) => {
    if (value.length > length) return `Max length is ${length} symbols`;

    return undefined;
}