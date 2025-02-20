export const capitalize = (str: string) => str?.replace(/\b\w/g, substr => substr.toUpperCase())

export const encode = (str: string) => encodeURIComponent(str)