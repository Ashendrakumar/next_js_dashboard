// hooks/useUsers.ts

"use client";

import { useState, useCallback, useEffect } from "react";
import { User, UsersListResponse, UsersListParams } from "@/types/user";
import { apiGet } from "@/lib/api";
import { buildQueryString } from "@/lib/utils";

interface UseUsersOptions {
  initialPage?: number;
  initialLimit?: number;
  initialSearch?: string;
  initialSortBy?: string;
  initialOrder?: string;
}

export function useUsers(options: UseUsersOptions = {}) {
  const {
    initialPage = 1,
    initialLimit = 10,
    initialSearch = "",
    initialSortBy = "name",
    initialOrder = "asc",
  } = options;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Sorting and filtering
  const [search, setSearch] = useState(initialSearch);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [order, setOrder] = useState(initialOrder as "asc" | "desc");

  /**
   * Fetch users from API
   */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: UsersListParams = {
        page,
        limit,
        search: search || undefined,
        sortBy: (sortBy as any) || undefined,
        order,
      };

      const queryString = buildQueryString(params);
      const response = await apiGet<UsersListResponse>(
        `/api/users?${queryString}`,
      );

      setUsers(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, sortBy, order]);

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /**
   * Update search term
   */
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page on search
  }, []);

  /**
   * Change page
   */
  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(Math.max(1, Math.min(newPage, totalPages)));
    },
    [totalPages],
  );

  /**
   * Change page size
   */
  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page on limit change
  }, []);

  /**
   * Update sorting
   */
  const handleSort = useCallback(
    (column: string) => {
      if (sortBy === column) {
        // Toggle order if sorting by same column
        setOrder(order === "asc" ? "desc" : "asc");
      } else {
        setSortBy(column);
        setOrder("asc");
      }
      setPage(1); // Reset to first page on sort change
    },
    [sortBy, order],
  );

  /**
   * Refresh data manually
   */
  const refresh = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    // Data
    users,
    total,
    totalPages,

    // State
    loading,
    error,
    page,
    limit,
    search,
    sortBy,
    order,

    // Actions
    handleSearch,
    handlePageChange,
    handleLimitChange,
    handleSort,
    refresh,
    setPage,
    setLimit,
    setSearch,
    setSortBy,
    setOrder,
  };
}
