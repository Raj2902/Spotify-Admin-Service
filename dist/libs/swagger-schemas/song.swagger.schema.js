export const songInputSwaggerSchema = {
    type: "object",
    required: ["title", "description", "file", "album"],
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        file: { type: "string", format: "binary" },
        album: { type: "number" },
    },
};
export const songOutputSwaggerSchema = {
    type: "object",
    properties: {
        message: { type: "string" },
        data: {
            type: "object",
            properties: {
                id: { type: "number" },
                title: { type: "string" },
                description: { type: "string" },
                thumbnail: { type: "null" },
                audio: { type: "string" },
                album_id: { type: "number" },
                created_at: { type: "string", format: "date-time" },
            },
        },
    },
};
//# sourceMappingURL=song.swagger.schema.js.map