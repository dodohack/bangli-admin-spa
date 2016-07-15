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
}