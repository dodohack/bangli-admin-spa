export interface PageParams {
    page: string;
    status?: string;
    editor?: string;
    query?: string;
}

export interface Page {
    id: number;
    selected?: boolean;
    editor_id?: number;
    image_id?:number;
    status?:string;
    title?:string;
    content?:string;
    published_at?:string;
    created_at?:string;
    updated_at?:string;
}