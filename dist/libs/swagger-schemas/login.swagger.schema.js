import { profileResponseSwaggerSchema } from "./profile.swagger.schema.js";
export const loginInputSwaggerSchema = {
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            format: "email",
            example: "user@example.com",
            description: "Must be unique across all the users",
        },
        password: { type: "string" },
    },
};
export const loginOuputSwaggerSchema = {
    type: "object",
    properties: {
        message: { type: "string" },
        user: { $ref: "#/components/schemas/Profile" },
        token: { type: "string" },
    },
};
//# sourceMappingURL=login.swagger.schema.js.map