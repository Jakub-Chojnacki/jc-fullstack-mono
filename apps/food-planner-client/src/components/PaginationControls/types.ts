import type { TPaginationMeta } from "@/hooks/usePagination/types";

export type TPaginationControlsProps = {
  paginationMeta: TPaginationMeta;
  onPreviousPage: () => void;
  onNextPage: () => void;
  itemCount: number;
  itemType: string;
  searchTerm?: string;
};
