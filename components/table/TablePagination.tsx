// components/table/TablePagination.tsx

"use client";

import Button from "@/components/ui/Button";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function TablePagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
}: TablePaginationProps) {
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-[#475569] bg-[#0f172a]">
      <div className="flex items-center gap-4">
        <div className="text-sm text-[#cbd5e1]">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{total}</span> results
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-[#cbd5e1]">Rows per page:</label>
          <select
            value={limit}
            onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
            className="px-2 py-1 border border-[#475569] rounded text-sm bg-[#1e293b] text-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          ← Previous
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            let pageNum: number;

            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            const isActive = pageNum === page;

            return (
              <button
                key={i}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-[#1e293b] text-[#cbd5e1] border border-[#475569] hover:bg-[#334155]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
