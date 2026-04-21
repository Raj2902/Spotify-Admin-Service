export declare const userBaseSwaggerSchema: {
    type: string;
    required: string[];
    properties: {
        _id: {
            type: string;
        };
        name: {
            type: string;
        };
        email: {
            type: string;
            format: string;
            example: string;
            description: string;
        };
        password: {
            type: string;
        };
        role: {
            type: string;
            default: string;
        };
        playlist: {
            type: string;
            items: {
                type: string;
            };
        };
        createdAt: {
            type: string;
            format: string;
        };
        updatedAt: {
            type: string;
            format: string;
        };
    };
};
//# sourceMappingURL=user.swagger.schema.d.ts.map