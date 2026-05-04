// components/table/TableToolbar.tsx

"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect } from "react";

interface TableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function TableToolbar({
  search,
  onSearchChange,
  onRefresh,
  isLoading,
}: TableToolbarProps) {
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedSearch = useDebounce(localSearch, 300);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="flex gap-3 items-center justify-between">
      <Input
        type="text"
        placeholder="Search by name or email..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="w-1/2 text-sm bg-[#1e293b] border-[#475569] text-[#f1f5f9]"
      />
      {onRefresh && (
        <Button
          className="whitespace-nowrap"
          variant="primary"
          size="md"
          onClick={onRefresh}
          loading={isLoading}
        >
          ↻ Refresh
        </Button>
      )}
    </div>
  );
}
