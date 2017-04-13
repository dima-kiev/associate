export function parseId(href) {
    let array = href.split("/");
    return array[array.length-1];
}

