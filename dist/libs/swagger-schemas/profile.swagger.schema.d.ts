export declare const profileResponseSwaggerSchema: {
    type: string;
    properties: {
        name: {
            type: string;
        };
        email: {
            type: string;
            format: string;
            example: string;
            description: string;
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
        _id: {
            type: string;
        };
        createdAt: {
            type: string;
        };
        updatedAt: {
            type: string;
        };
        __v: {
            type: string;
        };
    };
};
//# sourceMappingURL=profile.swagger.schema.d.ts.map