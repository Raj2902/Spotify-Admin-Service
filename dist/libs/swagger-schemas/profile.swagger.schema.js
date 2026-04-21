export const profileResponseSwaggerSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        email: {
            type: "string",
            format: "email",
            example: "user@example.com",
            description: "Must be unique across all the users",
        },
        role: { type: "string", default: "user" },
        playlist: { type: "array", items: { type: "string" } },
        _id: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        __v: { type: "number" },
    },
};
//# sourceMappingURL=profile.swagger.schema.js.map