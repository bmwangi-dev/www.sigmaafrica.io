import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import type { Pagination as PaginationType } from '../../types/Pagination';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface PaginationProps {
    pagination: PaginationType<any>;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    showPageSizeSelector?: boolean;
    pageSizeOptions?: number[];
    showInfo?: boolean;
    className?: string;
}

export function Pagination({
    pagination,
    onPageChange,
    onPageSizeChange,
    showPageSizeSelector = true,
    pageSizeOptions = [10, 25, 50, 100],
    showInfo = true,
    className = "",
}: PaginationProps) {
    const {
        current_page,
        last_page,
        per_page,
        total,
        from,
        to,
    } = pagination;

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 7;

        if (last_page <= maxVisible) {
            // Show all pages if total pages is small
            for (let i = 1; i <= last_page; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            let startPage = Math.max(2, current_page - 2);
            let endPage = Math.min(last_page - 1, current_page + 2);

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pages.push('...');
                startPage = Math.max(startPage, current_page - 1);
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < last_page - 1) {
                pages.push('...');
            }

            // Always show last page (if it's not already included)
            if (last_page > 1) {
                pages.push(last_page);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    const handlePageSizeChange = (newPageSize: string) => {
        if (onPageSizeChange) {
            onPageSizeChange(parseInt(newPageSize));
        }
    };

    return (
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
            {/* Pagination Info */}
            {showInfo && (
                <div className="text-sm text-gray-700 order-2 sm:order-1">
                    Showing {from} to {to} of {total} results
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 order-1 sm:order-2">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(current_page - 1)}
                    disabled={current_page <= 1}
                    className="flex items-center gap-1"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </Button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {pageNumbers.map((page, index) => {
                        if (page === '...') {
                            return (
                                <div key={`ellipsis-${index}`} className="px-2">
                                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                </div>
                            );
                        }

                        const pageNum = page as number;
                        const isActive = pageNum === current_page;

                        return (
                            <Button
                                key={pageNum}
                                variant={isActive ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(pageNum)}
                                className={`min-w-[2.5rem] ${isActive ? 'pointer-events-none' : ''}`}
                            >
                                {pageNum}
                            </Button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(current_page + 1)}
                    disabled={current_page >= last_page}
                    className="flex items-center gap-1"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Page Size Selector */}
            {showPageSizeSelector && onPageSizeChange && (
                <div className="flex items-center gap-2 order-3">
                    <span className="text-sm text-gray-700">Show:</span>
                    <Select value={per_page.toString()} onValueChange={handlePageSizeChange}>
                        <SelectTrigger className="w-20">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {pageSizeOptions.map((size) => (
                                <SelectItem key={size} value={size.toString()}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-gray-700">per page</span>
                </div>
            )}
        </div>
    );
}

// Simple pagination component without page size selector
export function SimplePagination({
    pagination,
    onPageChange,
    showInfo = true,
    className = "",
}: Omit<PaginationProps, 'onPageSizeChange' | 'showPageSizeSelector' | 'pageSizeOptions'>) {
    return (
        <Pagination
            pagination={pagination}
            onPageChange={onPageChange}
            showPageSizeSelector={false}
            showInfo={showInfo}
            className={className}
        />
    );
}

// Compact pagination for mobile/small spaces
export function CompactPagination({
    pagination,
    onPageChange,
    className = "",
}: Omit<PaginationProps, 'onPageSizeChange' | 'showPageSizeSelector' | 'pageSizeOptions' | 'showInfo'>) {
    const { current_page, last_page, from, to, total } = pagination;

    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div className="text-sm text-gray-700">
                {from}-{to} of {total}
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(current_page - 1)}
                    disabled={current_page <= 1}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>

                <span className="text-sm text-gray-700 px-2">
                    {current_page} of {last_page}
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(current_page + 1)}
                    disabled={current_page >= last_page}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
