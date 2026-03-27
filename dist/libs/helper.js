export function getAssetPublicId(url, folder) {
    const startIndex = url.lastIndexOf("/");
    const endIndex = url.lastIndexOf(".");
    return `${folder}/${url.slice(startIndex + 1, endIndex)}`;
}
//# sourceMappingURL=helper.js.map