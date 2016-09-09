export class PageParams {
    cur_page: string = '1';
    state: string;
    editor: string;
    query: string;
}

export class Page {
    id: number;
    selected: boolean;
    editor_id: number;
    image_id:number;
    status:string;
    title:string;
    content:string;
    published_at:string;
    created_at:string;
    updated_at:string;
}