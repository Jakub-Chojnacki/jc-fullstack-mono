import { useState } from "react";

import type { TFilterOption } from "@/components/SearchableListLayout/types";

type UseFilterProps = {
  onFilterChange?: () => void;
};

export function useFilter({ onFilterChange }: UseFilterProps = {}) {
  const [filterValue, setFilterValue] = useState<TFilterOption>("ALL");

  const handleFilterChange = (value: TFilterOption) => {
    setFilterValue(value);
    onFilterChange?.();
  };

  return {
    filterValue,
    handleFilterChange,
  };
}
