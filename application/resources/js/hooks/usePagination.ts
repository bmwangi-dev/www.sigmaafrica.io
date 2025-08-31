import { useState, useCallback, useMemo } from 'react';
import { router } from '@inertiajs/react';
import type { Pagination as PaginationType } from '../types/Pagination';
import type { PaginationMeta } from '../types/Pagination';



interface UsePaginationProps {
    initialPage?: number;
    initialPageSize?: number;
    preserveState?: boolean;
    preserveScroll?: boolean;
    only?: string[];
    replace?: boolean;
}

interface PaginationState {
    currentPage: number;
    pageSize: number;
    search?: string;
    filters?: Record<string, any>;
}

export function usePagination({
    initialPage = 1,
    initialPageSize = 10,
    preserveState = true,
    preserveScroll = false,
    only,
    replace = false,
}: UsePaginationProps = {}) {
    const [state, setState] = useState<PaginationState>({
        currentPage: initialPage,
        pageSize: initialPageSize,
    });

    // Navigate to a specific page
    const goToPage = useCallback((page: number, additionalParams: Record<string, any> = {}) => {
        const params = {
            page,
            per_page: state.pageSize,
            ...additionalParams,
        };

        router.get(window.location.pathname, params, {
            preserveState,
            preserveScroll,
            only,
            replace,
        });

        setState(prev => ({ ...prev, currentPage: page }));
    }, [state.pageSize, preserveState, preserveScroll, only, replace]);

    // Change page size
    const changePageSize = useCallback((newPageSize: number, resetToFirstPage: boolean = true) => {
        const page = resetToFirstPage ? 1 : state.currentPage;

        const params = {
            page,
            per_page: newPageSize,
        };

        router.get(window.location.pathname, params, {
            preserveState,
            preserveScroll,
            only,
            replace,
        });

        setState(prev => ({
            ...prev,
            pageSize: newPageSize,
            currentPage: page,
        }));
    }, [state.currentPage, preserveState, preserveScroll, only, replace]);

    // Search with pagination reset
    const search = useCallback((searchTerm: string, additionalFilters: Record<string, any> = {}) => {
        const params = {
            page: 1,
            per_page: state.pageSize,
            search: searchTerm || undefined,
            ...additionalFilters,
        };

        router.get(window.location.pathname, params, {
            preserveState,
            preserveScroll,
            only,
            replace,
        });

        setState(prev => ({
            ...prev,
            currentPage: 1,
            search: searchTerm,
            filters: additionalFilters,
        }));
    }, [state.pageSize, preserveState, preserveScroll, only, replace]);

    // Apply filters with pagination reset
    const applyFilters = useCallback((filters: Record<string, any>) => {
        const params = {
            page: 1,
            per_page: state.pageSize,
            search: state.search || undefined,
            ...filters,
        };

        router.get(window.location.pathname, params, {
            preserveState,
            preserveScroll,
            only,
            replace,
        });

        setState(prev => ({
            ...prev,
            currentPage: 1,
            filters,
        }));
    }, [state.pageSize, state.search, preserveState, preserveScroll, only, replace]);

    // Clear all filters and search
    const clearFilters = useCallback(() => {
        const params = {
            page: 1,
            per_page: state.pageSize,
        };

        router.get(window.location.pathname, params, {
            preserveState,
            preserveScroll,
            only,
            replace,
        });

        setState(prev => ({
            ...prev,
            currentPage: 1,
            search: undefined,
            filters: undefined,
        }));
    }, [state.pageSize, preserveState, preserveScroll, only, replace]);

    return {
        state,
        goToPage,
        changePageSize,
        search,
        applyFilters,
        clearFilters,
    };
}

// Utility functions for pagination
export const paginationUtils = {
    // Calculate pagination metadata
    getMeta: (pagination: PaginationType<any>): PaginationMeta => ({
        current_page: pagination.current_page,
        from: pagination.from,
        last_page: pagination.last_page,
        per_page: pagination.per_page,
        to: pagination.to,
        total: pagination.total,
        has_more_pages: pagination.current_page < pagination.last_page,
        has_previous_page: pagination.current_page > 1,
        has_next_page: pagination.current_page < pagination.last_page,
        showing_results: `Showing ${pagination.from} to ${pagination.to} of ${pagination.total} results`,
    }),

    // Generate page range for display
    getPageRange: (currentPage: number, lastPage: number, maxVisible: number = 7): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (lastPage <= maxVisible) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let startPage = Math.max(2, currentPage - 2);
            let endPage = Math.min(lastPage - 1, currentPage + 2);

            if (startPage > 2) {
                pages.push('...');
                startPage = Math.max(startPage, currentPage - 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < lastPage - 1) {
                pages.push('...');
            }

            if (lastPage > 1) {
                pages.push(lastPage);
            }
        }

        return pages;
    },

    // Calculate items per page options
    getPageSizeOptions: (total: number): number[] => {
        const baseOptions = [10, 25, 50, 100];
        return baseOptions.filter(option => option < total || option === baseOptions[0]);
    },

    // Build pagination URL with parameters
    buildUrl: (baseUrl: string, page: number, pageSize: number, params: Record<string, any> = {}): string => {
        const url = new URL(baseUrl, window.location.origin);
        url.searchParams.set('page', page.toString());
        url.searchParams.set('per_page', pageSize.toString());

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                url.searchParams.set(key, value.toString());
            }
        });

        return url.pathname + url.search;
    },

    // Parse URL parameters for pagination
    parseUrlParams: (searchParams: URLSearchParams): { page: number; pageSize: number; filters: Record<string, string> } => {
        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = parseInt(searchParams.get('per_page') || '10', 10);
        const filters: Record<string, string> = {};

        searchParams.forEach((value, key) => {
            if (key !== 'page' && key !== 'per_page') {
                filters[key] = value;
            }
        });

        return { page, pageSize, filters };
    },
};

// Hook for URL-based pagination state
export function useUrlPagination() {
    const urlParams = useMemo(() => {
        if (typeof window === 'undefined') return { page: 1, pageSize: 10, filters: {} };
        const searchParams = new URLSearchParams(window.location.search);
        return paginationUtils.parseUrlParams(searchParams);
    }, []);

    return urlParams;
}
