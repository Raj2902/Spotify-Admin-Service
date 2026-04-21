export declare const songInputSwaggerSchema: {
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
        album: {
            type: string;
        };
    };
};
export declare const songOutputSwaggerSchema: {
    type: string;
    properties: {
        message: {
            type: string;
        };
        data: {
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
                audio: {
                    type: string;
                };
                album_id: {
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
//# sourceMappingURL=song.swagger.schema.d.ts.map