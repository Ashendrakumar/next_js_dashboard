// components/dashboard/UserTableContainer.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { DataTable } from "@/components/table/DataTable";
import { TablePagination } from "@/components/table/TablePagination";
import { TableToolbar } from "@/components/table/TableToolbar";
import { useUsers } from "@/hooks/useUsers";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        onClick={() => handleSort("id", column)}
      >
        ID
        <span className="text-xs">↕</span>
      </button>
    ),
    cell: (info) => (
      <span className="font-mono text-xs">{info.getValue()}</span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        onClick={() => handleSort("name", column)}
      >
        Name
        <span className="text-xs">↕</span>
      </button>
    ),
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        onClick={() => handleSort("email", column)}
      >
        Email
        <span className="text-xs">↕</span>
      </button>
    ),
    cell: (info) => <span className="text-blue-600">{info.getValue()}</span>,
  },
];

// Placeholder for sorting (will be handled in component)
function handleSort(column: string, col: any) {
  // This is called from column header clicks
}

export function UserTableContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse URL params
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialLimit = parseInt(searchParams.get("limit") || "10", 10);
  const initialSearch = searchParams.get("search") || "";
  const initialSortBy = searchParams.get("sortBy") || "name";
  const initialOrder = (searchParams.get("order") || "asc") as "asc" | "desc";

  const {
    users,
    total,
    totalPages,
    loading,
    error,
    page,
    limit,
    search,
    sortBy,
    order,
    handleSearch,
    handlePageChange,
    handleLimitChange,
    handleSort,
    refresh,
  } = useUsers({
    initialPage,
    initialLimit,
    initialSearch,
    initialSortBy,
    initialOrder,
  });

  // Sync URL params when table state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (limit !== 10) params.set("limit", String(limit));
    if (search) params.set("search", search);
    if (sortBy !== "name") params.set("sortBy", sortBy);
    if (order !== "asc") params.set("order", order);

    const query = params.toString();
    const newUrl = query ? `/dashboard?${query}` : "/dashboard";
    router.push(newUrl);
  }, [page, limit, search, sortBy, order, router]);

  const enhancedColumns: ColumnDef<User>[] = columns.map((col) => ({
    ...col,
    header: (headerContext) => {
      const columnId = col.accessorKey as string;
      return (
        <button
          className="flex items-center gap-2 hover:text-blue-600 transition-colors font-medium"
          onClick={() => handleSort(columnId)}
        >
          {typeof col.header === "string"
            ? col.header
            : col.header instanceof Function
              ? col.header(headerContext)
              : null}
          <span
            className={`text-xs ${sortBy === columnId ? "text-blue-600" : ""}`}
          >
            {sortBy === columnId ? (order === "asc" ? "▲" : "▼") : "↕"}
          </span>
        </button>
      );
    },
  }));

  return (
    <div className="space-y-4">
      <TableToolbar
        search={search}
        onSearchChange={handleSearch}
        onRefresh={refresh}
        isLoading={loading}
      />

      <DataTable
        columns={enhancedColumns}
        data={users}
        isLoading={loading}
        error={error}
      />

      {!error && !loading && users.length > 0 && (
        <TablePagination
          page={page}
          totalPages={totalPages}
          total={total}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      )}
    </div>
  );
}
