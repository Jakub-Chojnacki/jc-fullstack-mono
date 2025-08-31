import { Button, Input } from "@jcmono/ui";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Apple, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import useDeleteIngredient from "@/queries/useDeleteIngredient";
import useGetIngredients from "@/queries/useGetIngredients";

import HeaderWithIcon from "../HeaderWithIcon";

import SingleIngredientCard from "./components/SingleIngredientCard";

function IngredientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const navigation = useNavigate({ from: "/app/ingredients" });

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data, isLoading } = useGetIngredients({
    page: currentPage,
    take: itemsPerPage,
    search: debouncedSearchTerm,
  });

  const { mutate } = useDeleteIngredient();

  const handleDelete = (id: number) => {
    // TODO: Add Confirmation Dialog
    mutate({ params: { id } });
  };

  const displayedIngredients = useMemo(() => data?.body?.data || [], [data?.body?.data]);
  const paginationMeta = data?.body?.pagination;

  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
  };

  const handlePreviousPage = (): void => {
    if (paginationMeta?.hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = (): void => {
    if (paginationMeta?.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="h-[calc(100dvh-theme(space.4))] py-4 flex flex-col">
      <HeaderWithIcon icon={Apple} title="Ingredients" />
      <div className="flex items-center justify-between gap-4 py-4">
        <Input
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={event => handleSearchChange(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => navigation({ to: "/app/ingredients/add" })}>
          <Plus className="md:mr-2 h-4 w-4" />
          <span className="hidden md:block">Add New Ingredient</span>
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading
          ? (
              <div className="flex items-center justify-center h-32 text-center text-muted-foreground">
                Loading ingredients...
              </div>
            )
          : displayedIngredients.length > 0
            ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayedIngredients.map(ingredient => (
                    <SingleIngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              )
            : (
                <div className="flex items-center justify-center h-32 text-center text-muted-foreground">
                  {searchTerm
                    ? "No ingredients found matching your search."
                    : "No ingredients found."}
                </div>
              )}
      </div>

      {paginationMeta && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Showing
            {" "}
            {displayedIngredients.length}
            {" "}
            of
            {" "}
            {paginationMeta.totalCount}
            {" "}
            ingredients
            {debouncedSearchTerm && ` (searching for "${debouncedSearchTerm}")`}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Page
              {" "}
              {paginationMeta.currentPage}
              {" "}
              of
              {" "}
              {paginationMeta.totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={!paginationMeta.hasPreviousPage}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!paginationMeta.hasNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default IngredientsList;
