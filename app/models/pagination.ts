/**
 * This is the definition of pagination
 */

export class Pagination {
    constructor (
        /* Total items */
        public total: number,
        /* First page, always 1 */
        public first_page: number,
        /* Number of items per page */
        public per_page: number,
        /* Previous page */
        public pre_page: number,
        /* Current page index */
        public current_page: number,
        /* Next page */
        public next_page: number,
        /* Last page number */
        public last_page: number,
        /* Items of current page starts from, in total */
        public from: number,
        /* Items of current page ends to, in total */
        public to: number
    ){ }

    /**
     * Setup pagination from given json data returned from API server
     * @param json
     */
    public setup(json)
    {
        /* '+' magically converts string to number */
        this.total = +json['total'];
        this.per_page = +json['per_page'];
        this.current_page = +json['current_page'];
        this.last_page = +json['last_page'];
        this.from = +json['from'];
        this.to = +json['to'];

        this.pre_page =
            this.current_page > 1 ?
            this.current_page - 1 : this.current_page;
        this.next_page =
            this.current_page < this.last_page ?
            this.current_page + 1 : this.last_page;
    }
}