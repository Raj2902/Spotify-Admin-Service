export const userBaseSwaggerSchema = {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
        _id: { type: "string" },
        name: { type: "string" },
        email: {
            type: "string",
            format: "email",
            example: "user@example.com",
            description: "Must be unique accross all the users",
        },
        password: { type: "string" },
        role: { type: "string", default: "user" },
        playlist: { type: "array", items: { type: "string" } },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
    },
};
//# sourceMappingURL=user.swagger.schema.js.map