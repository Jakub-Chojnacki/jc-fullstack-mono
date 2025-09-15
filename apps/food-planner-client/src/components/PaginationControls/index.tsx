import { Button } from "@jcmono/ui";

import type { TPaginationControlsProps } from "./types";

function PaginationControls({
  paginationMeta,
  onPreviousPage,
  onNextPage,
  itemCount,
  itemType,
  searchTerm,
}: TPaginationControlsProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm text-muted-foreground">
        Showing
        {" "}
        {itemCount}
        {" "}
        of
        {" "}
        {paginationMeta.totalCount}
        {" "}
        {itemType}
        {searchTerm && ` (searching for "${searchTerm}")`}
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm text-muted-foreground">
          Page
          {" "}
          {paginationMeta.currentPage}
          {" "}
          of
          {" "}
          {Math.max(paginationMeta.totalPages, 1)}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousPage}
            disabled={!paginationMeta.hasPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={!paginationMeta.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaginationControls;
