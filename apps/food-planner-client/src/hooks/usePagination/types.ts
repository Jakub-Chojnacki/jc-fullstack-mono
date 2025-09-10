export type TPaginationMeta = {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalCount: number;
};

export type TUsePaginationParams = {
  initialPage?: number;
  itemsPerPage?: number;
};
