export function uglifyUrl(url) {
    return url.replace(/\//g, '!').replace(/:/g, '@')
}

export function unuglifyUrl(url) {
    return url.replace(/!/g, '/').replace(/@/g, ':')
}