export function getAssetPublicId(url: string, folder: string) {
  const startIndex = url.lastIndexOf("/");
  const endIndex = url.lastIndexOf(".");
  return `${folder}/${url.slice(startIndex + 1, endIndex)}`;
}
