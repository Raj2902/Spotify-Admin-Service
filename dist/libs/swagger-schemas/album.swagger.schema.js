export const albumInputSwaggerSchema = {
    type: "object",
    required: ["title", "description", "file"],
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        file: { type: "string", format: "binary" },
    },
};
export const albumOuputSwaggerSchema = {
    type: "object",
    properties: {
        message: { type: "string" },
        album: {
            type: "object",
            properties: {
                id: { type: "number" },
                title: { type: "string" },
                description: { type: "string" },
                thumbnail: { type: "string" },
                created_at: { type: "string", format: "date-time" },
            },
        },
    },
};
export const deleteAlbumSwaggerSchema = {
    type: "object",
    properties: {
        message: { type: "string" },
    },
};
//# sourceMappingURL=album.swagger.schema.js.map