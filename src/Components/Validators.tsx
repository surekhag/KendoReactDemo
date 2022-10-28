const NameRegex: RegExp = new RegExp(/^[A-Za-z0-9]+$/);


export const nameValidator = (value: string) => {
    
    if (NameRegex.test(value) && value && value.length > 0)
        return ""
    else {
        return "Please enter a valid Name."

    }
}

export const desnValidator = (value: string) => {
    
    if (NameRegex.test(value) && value && value.length > 0)
        return ""
    else {
        return "Please enter a valid Designation."

    }
}
export const deptValidator = (value: string) => {
    
    if (NameRegex.test(value) && value && value.length > 0)
        return ""
    else {
        return "Please enter a valid Department."

    }
}

export const addressValidator = (value: string) => {
    
    if (NameRegex.test(value) && value && value.length > 0)
        return ""
    else {
        return "Please enter a valid Address."

    }
}
