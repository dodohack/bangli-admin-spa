export class Page {
    constructor(public id:number,
                public editor_id:number,
                public image_id:number,
                public status:string,
                public title:string,
                public content?:string,
                public checked?:boolean, /* Is checked in post list */
                public editing?:boolean, /* Is in fast editing mode */
                public published_at?:string,
                public created_at?:string,
                public updated_at?:string,
                public dirtyContent?:boolean /* Is post content changed */) {
    }
}