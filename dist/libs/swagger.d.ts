import "dotenv/config";
export declare const swaggerOptions: {
    definition: {
        openapi: string;
        info: {
            title: string;
            version: string;
            description: string;
        };
        servers: {
            url: string;
            description: string;
        }[];
        components: {
            schemas: {
                AlbumInput: {
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
                AlbumOutput: {
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
                SongInput: {
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
                SongOutput: {
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
                SongThumbnailInput: {
                    type: string;
                    required: string[];
                    properties: {
                        file: {
                            type: string;
                            format: string;
                        };
                    };
                };
                DeleteAlbumOutput: {
                    type: string;
                    properties: {
                        message: {
                            type: string;
                        };
                    };
                };
            };
        };
    };
    apis: string[];
};
//# sourceMappingURL=swagger.d.ts.map