export declare const albumInputSwaggerSchema: {
    type: string;
    required: string[];
    properties: {
        title: {
            type: string;
        };
        description: {
            type: string;
        };
        file: {
            type: string;
            format: string;
        };
    };
};
export declare const albumOuputSwaggerSchema: {
    type: string;
    properties: {
        message: {
            type: string;
        };
        album: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                title: {
                    type: string;
                };
                description: {
                    type: string;
                };
                thumbnail: {
                    type: string;
                };
                created_at: {
                    type: string;
                    format: string;
                };
            };
        };
    };
};
export declare const deleteAlbumSwaggerSchema: {
    type: string;
    properties: {
        message: {
            type: string;
        };
    };
};
//# sourceMappingURL=album.swagger.schema.d.ts.map