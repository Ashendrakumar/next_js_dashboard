// components/table/DataTable.tsx

"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { User } from "@/types/user";

interface DataTableProps {
  columns: ColumnDef<User>[];
  data: User[];
  isLoading?: boolean;
  error?: string | null;
}

export function DataTable({ columns, data, isLoading, error }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <div className="p-6 text-center bg-red-900/20 border border-red-700 rounded-lg">
        <p className="text-red-400 font-medium">Error loading data</p>
        <p className="text-red-300 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 bg-[#1e293b] rounded animate-pulse"
          >
            <div className="h-4 bg-[#334155] rounded flex-1" />
            <div className="h-4 bg-[#334155] rounded flex-1" />
            <div className="h-4 bg-[#334155] rounded w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-8 text-center bg-[#1e293b] rounded-lg border border-[#475569]">
        <svg
          className="mx-auto h-12 w-12 text-[#475569]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 className="mt-4 font-medium text-[#f1f5f9]">No users found</h3>
        <p className="mt-2 text-[#cbd5e1] text-sm">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-[#475569] rounded-lg bg-[#1e293b]">
      <table className="w-full">
        <thead className="bg-[#0f172a] border-b border-[#475569]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-[#cbd5e1] uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-[#334155]">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-[#334155]/50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-[#f1f5f9]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
