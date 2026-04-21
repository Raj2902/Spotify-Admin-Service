export declare const loginInputSwaggerSchema: {
    type: string;
    required: string[];
    properties: {
        email: {
            type: string;
            format: string;
            example: string;
            description: string;
        };
        password: {
            type: string;
        };
    };
};
export declare const loginOuputSwaggerSchema: {
    type: string;
    properties: {
        message: {
            type: string;
        };
        user: {
            $ref: string;
        };
        token: {
            type: string;
        };
    };
};
//# sourceMappingURL=login.swagger.schema.d.ts.map