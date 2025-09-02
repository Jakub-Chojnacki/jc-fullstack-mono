import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@jcmono/ui";
import { Plus } from "lucide-react";

import HeaderWithIcon from "../HeaderWithIcon";
import PaginationControls from "../PaginationControls";

import { filterOptions } from "./const";

import type { TFilterOption, TSearchableListLayoutProps } from "./types";

function SearchableListLayout({
  icon,
  title,
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  filterValue,
  onFilterChange,
  onAddClick,
  addButtonText,
  isLoading,
  children,
  emptyMessage,
  emptySearchMessage,
  paginationMeta,
  itemCount,
  itemType,
  onPreviousPage,
  onNextPage,
  debouncedSearchTerm,
}: TSearchableListLayoutProps) {
  const hasItems = itemCount > 0;
  const showEmptyMessage = !isLoading && !hasItems;

  return (
    <div className="h-[calc(100dvh-theme(space.4))] py-4 flex flex-col">
      <HeaderWithIcon icon={icon} title={title} />

      <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={event => onSearchChange(event.target.value)}
            className="max-w-sm"
          />
          {onFilterChange && (
            <Select
              value={filterValue}
              onValueChange={(value: TFilterOption) => onFilterChange(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <Button onClick={onAddClick}>
          <Plus className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">{addButtonText}</span>
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading
          ? (
              <div className="flex items-center justify-center h-32 text-center text-muted-foreground">
                Loading
                {" "}
                {itemType}
                ...
              </div>
            )
          : hasItems
            ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {children}
                </div>
              )
            : showEmptyMessage
              ? (
                  <div className="flex items-center justify-center h-32 text-center text-muted-foreground">
                    {searchTerm ? emptySearchMessage : emptyMessage}
                  </div>
                )
              : null}
      </div>

      {paginationMeta && (
        <PaginationControls
          paginationMeta={paginationMeta}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          itemCount={itemCount}
          itemType={itemType}
          searchTerm={debouncedSearchTerm}
        />
      )}
    </div>
  );
}

export default SearchableListLayout;
