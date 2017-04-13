export function validate(field, validationArr) {
    if (!validationArr) {
        return {message: null, state: null}
    }
    let errors = validationArr.errors;
    if (!errors) {
        return {message: null, state: null}
    }
    for (let i = 0; i < errors.length; i++) {
        let obj = errors[i];
        if (obj.property == field) {
            return {message: obj.message, state: "error"};
        }
    }
    return {message: null, state: null}
}

export function hasGlobalError(errors) {
    if (!errors) {
        return false;
    }
    return errors.constructor === String;
}
