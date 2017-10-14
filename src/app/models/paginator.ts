/**
 * This is the definition of pagination, it should match the paginator we
 * defined at server side
 */

export interface Paginator {
    total: number; /* Total items */
    count: number; /* Number of items of current page */
    cur_page: number;  /* Current page index */
    per_page: number;  /* Number of items per page */
    pre_page: number;  /* Previous page */
    next_page: number; /* Next page */
    last_page: number; /* Last page number */
}
