import { useEffect, useState } from "react";

import type { TUseDebouncedSearchParams } from "./types";

export function useDebouncedSearch({ delay = 300, onSearchChange }: TUseDebouncedSearchParams = {}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      onSearchChange?.(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay, onSearchChange]);

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    handleSearchChange: (value: string) => setSearchTerm(value),
  };
}
