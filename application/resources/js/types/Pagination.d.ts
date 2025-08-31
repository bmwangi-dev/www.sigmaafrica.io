export interface Pagination<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: PaginationLink[];
}
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    has_more_pages: boolean;
    has_previous_page: boolean;
    has_next_page: boolean;
    showing_results: string;
}
