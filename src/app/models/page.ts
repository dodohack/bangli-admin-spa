export class PageParams {
    cur_page: string = '1';
    status: string;
    editor: string;
    query: string;

    // Form a API query string
    toQueryString(): string {
        let s = '?page=' + this.cur_page;
        if (this.status) s = s + '&status=' + this.status;
        if (this.editor) s = s + '&editor=' + this.editor;
        if (this.query) s = s + '&query=' + this.query;
        return s;
    }    
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