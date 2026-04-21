export const registerInputSwaggerSchema = {
    allOf: [
        {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
            },
        },
        { $ref: "#/components/schemas/LoginInput" },
    ],
};
//# sourceMappingURL=register.swagger.schema.js.map