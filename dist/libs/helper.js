export function getAssetPublicId(url, folder) {
    const startIndex = url.lastIndexOf("/");
    const endIndex = url.lastIndexOf(".");
    if (folder)
        return `${folder}/${url.slice(startIndex + 1, endIndex)}`;
    return `${url.slice(startIndex + 1, endIndex)}`;
}
//# sourceMappingURL=helper.js.map