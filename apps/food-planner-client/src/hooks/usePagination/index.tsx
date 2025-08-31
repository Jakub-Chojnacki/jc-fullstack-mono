import { useState } from "react";

import type { TPaginationMeta, TUsePaginationParams } from "./types";

export function usePagination({ initialPage = 1, itemsPerPage = 20 }: TUsePaginationParams = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePreviousPage = (paginationMeta?: TPaginationMeta): void => {
    if (paginationMeta?.hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = (paginationMeta?: TPaginationMeta): void => {
    if (paginationMeta?.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const resetToFirstPage = (): void => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    handlePreviousPage,
    handleNextPage,
    resetToFirstPage,
  };
}
