import { Button, Input } from "@jcmono/ui";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Plus, Utensils } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import useDeleteRecipe from "@/queries/useDeleteRecipe";
import useGetRecipes from "@/queries/useGetRecipes";

import HeaderWithIcon from "../HeaderWithIcon";

import SingleRecipeCard from "./components/SingleRecipeCard";

function RecipesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const navigation = useNavigate({ from: "/app/recipes" });

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm !== debouncedSearchTerm) {
        setCurrentPage(1);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debouncedSearchTerm]);

  const { data, isLoading } = useGetRecipes({
    page: currentPage,
    take: itemsPerPage,
    search: debouncedSearchTerm,
  });

  const { mutate } = useDeleteRecipe();

  const handleDelete = (id: number) => {
    // TODO: Add Confirmation Dialog
    mutate({ params: { id } });
  };

  const handlePreview = (id: number) => {
    navigation({ to: `/app/recipes/preview/${id}` });
  };

  const handleEdit = (id: number) => {
    navigation({ to: `/app/recipes/edit/${id}` });
  };

  const displayedRecipes = useMemo(() => data?.body?.data || [], [data?.body?.data]);
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
      <HeaderWithIcon icon={Utensils} title="Recipes" />
      <div className="flex items-center justify-between gap-4 py-4">
        <Input
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={event => handleSearchChange(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => navigation({ to: "/app/recipes/add" })}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Recipe
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading
          ? (
              <div className="flex items-center justify-center h-32 text-center text-muted-foreground">
                Loading recipes...
              </div>
            )
          : displayedRecipes.length > 0
            ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayedRecipes.map(recipe => (
                    <SingleRecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onPreview={handlePreview}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )
            : (
                <div className="flex items-center justify-center h-32 text-center text-muted-foreground">
                  {searchTerm ? "No recipes found matching your search." : "No recipes found."}
                </div>
              )}
      </div>

      {paginationMeta && (
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Showing
            {" "}
            {displayedRecipes.length}
            {" "}
            of
            {" "}
            {paginationMeta.totalCount}
            {" "}
            recipes
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

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RecipesList;
