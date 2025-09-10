import type { TGetQueryFilter } from "@jcmono/api-contract";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type { TPaginationMeta } from "@/hooks/usePagination/types";

export type TFilterOption = TGetQueryFilter;
export type TFilterOptionWithLabel = { value: TFilterOption; label: string };

export type TSearchableListLayoutProps = {
  // Header
  icon: LucideIcon;
  title: string;

  // Search
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;

  // Filter
  filterValue?: TFilterOption;
  onFilterChange?: (value: TFilterOption) => void;

  onAddClick: () => void;
  addButtonText: string;

  // Content
  isLoading: boolean;
  children: ReactNode;
  emptyMessage: string;
  emptySearchMessage: string;

  // Pagination
  paginationMeta?: TPaginationMeta;
  itemCount: number;
  itemType: string;
  onPreviousPage: () => void;
  onNextPage: () => void;
  debouncedSearchTerm?: string;
};
