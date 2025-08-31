<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

trait HasPagination
{
    /**
     * Apply pagination to a query builder
     */
    public function paginateQuery(
        Builder $query,
        Request $request,
        int $defaultPerPage = 10,
        array $allowedPerPage = [10, 25, 50, 100]
    ): LengthAwarePaginator {
        $perPage = $this->getPerPageFromRequest($request, $defaultPerPage, $allowedPerPage);
        
        return $query->paginate(
            perPage: $perPage,
            page: $request->get('page', 1)
        )->withQueryString();
    }

    /**
     * Apply search to a query builder
     */
    public function applySearch(Builder $query, Request $request, array $searchableFields): Builder
    {
        $search = $request->get('search');
        
        if (!$search) {
            return $query;
        }

        return $query->where(function ($q) use ($search, $searchableFields) {
            foreach ($searchableFields as $field) {
                if (str_contains($field, '.')) {
                    // Handle relationship fields
                    [$relation, $relationField] = explode('.', $field, 2);
                    $q->orWhereHas($relation, function ($relationQuery) use ($relationField, $search) {
                        $relationQuery->where($relationField, 'like', "%{$search}%");
                    });
                } else {
                    // Handle direct fields
                    $q->orWhere($field, 'like', "%{$search}%");
                }
            }
        });
    }

    /**
     * Apply filters to a query builder
     */
    public function applyFilters(Builder $query, Request $request, array $filterableFields): Builder
    {
        foreach ($filterableFields as $field => $type) {
            $value = $request->get($field);
            
            if ($value === null || $value === '') {
                continue;
            }

            switch ($type) {
                case 'exact':
                    $query->where($field, $value);
                    break;
                    
                case 'like':
                    $query->where($field, 'like', "%{$value}%");
                    break;
                    
                case 'in':
                    if (is_array($value)) {
                        $query->whereIn($field, $value);
                    } else {
                        $query->where($field, $value);
                    }
                    break;
                    
                case 'date':
                    $query->whereDate($field, $value);
                    break;
                    
                case 'date_range':
                    if (is_array($value) && count($value) === 2) {
                        $query->whereBetween($field, $value);
                    }
                    break;
                    
                case 'boolean':
                    $query->where($field, filter_var($value, FILTER_VALIDATE_BOOLEAN));
                    break;
                    
                case 'relationship':
                    if (str_contains($field, '.')) {
                        [$relation, $relationField] = explode('.', $field, 2);
                        $query->whereHas($relation, function ($relationQuery) use ($relationField, $value) {
                            $relationQuery->where($relationField, $value);
                        });
                    }
                    break;
                    
                default:
                    $query->where($field, $value);
            }
        }

        return $query;
    }

    /**
     * Apply sorting to a query builder
     */
    public function applySorting(Builder $query, Request $request, array $sortableFields, string $defaultSort = 'id', string $defaultDirection = 'desc'): Builder
    {
        $sortBy = $request->get('sort', $defaultSort);
        $sortDirection = $request->get('direction', $defaultDirection);
        
        // Validate sort field
        if (!in_array($sortBy, $sortableFields)) {
            $sortBy = $defaultSort;
        }
        
        // Validate sort direction
        if (!in_array(strtolower($sortDirection), ['asc', 'desc'])) {
            $sortDirection = $defaultDirection;
        }

        // Handle relationship sorting
        if (str_contains($sortBy, '.')) {
            [$relation, $relationField] = explode('.', $sortBy, 2);
            return $query->join(
                str($relation)->plural()->value(), 
                str($relation)->plural()->value() . '.id', 
                '=', 
                $query->getModel()->getTable() . '.' . $relation . '_id'
            )->orderBy(str($relation)->plural()->value() . '.' . $relationField, $sortDirection);
        }

        return $query->orderBy($sortBy, $sortDirection);
    }

    /**
     * Get per page value from request with validation
     */
    private function getPerPageFromRequest(Request $request, int $default, array $allowed): int
    {
        $perPage = $request->get('per_page', $default);
        
        if (!is_numeric($perPage)) {
            return $default;
        }
        
        $perPage = (int) $perPage;
        
        if (!in_array($perPage, $allowed)) {
            return $default;
        }
        
        return $perPage;
    }

    /**
     * Create a paginated response with enhanced metadata
     */
    public function createPaginatedResponse(LengthAwarePaginator $paginator): array
    {
        $links = collect($paginator->linkCollection())->map(function ($link) {
            return [
                'url' => $link['url'],
                'label' => strip_tags($link['label']), // Remove HTML from Laravel's default labels
                'active' => $link['active'],
            ];
        })->toArray();

        return [
            'data' => $paginator->items(),
            'current_page' => $paginator->currentPage(),
            'first_page_url' => $paginator->url(1),
            'from' => $paginator->firstItem(),
            'last_page' => $paginator->lastPage(),
            'last_page_url' => $paginator->url($paginator->lastPage()),
            'next_page_url' => $paginator->nextPageUrl(),
            'path' => $paginator->path(),
            'per_page' => $paginator->perPage(),
            'prev_page_url' => $paginator->previousPageUrl(),
            'to' => $paginator->lastItem(),
            'total' => $paginator->total(),
            'links' => $links,
        ];
    }

    /**
     * Paginate a collection manually
     */
    public function paginateCollection(
        Collection $collection, 
        int $perPage, 
        int $currentPage = 1, 
        string $path = null
    ): LengthAwarePaginator {
        $path = $path ?: request()->url();
        
        $currentPageItems = $collection->slice(($currentPage - 1) * $perPage, $perPage);
        
        return new LengthAwarePaginator(
            $currentPageItems,
            $collection->count(),
            $perPage,
            $currentPage,
            [
                'path' => $path,
                'pageName' => 'page',
            ]
        );
    }
}
