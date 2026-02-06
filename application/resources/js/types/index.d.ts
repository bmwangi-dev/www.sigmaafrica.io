export interface SharedData {
    name: string;
    quote?: {
        message: string;
        author: string;
    };
    auth: {
        user: any;
    };
    [key: string]: any;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: any;
    };
};
