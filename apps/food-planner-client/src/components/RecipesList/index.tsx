import { Button, Input } from "@jcmono/ui";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Plus, Utensils } from "lucide-react";
import { useMemo, useState } from "react";

import useDeleteRecipe from "@/queries/useDeleteRecipe";
import useGetRecipes from "@/queries/useGetRecipes";

import HeaderWithIcon from "../HeaderWithIcon";

import SingleRecipeCard from "./components/SingleRecipeCard";

function RecipesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigation = useNavigate({ from: "/app/recipes" });

  const { data } = useGetRecipes();
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

  const filteredRecipes = useMemo(() => {
    if (!data?.body)
      return [];

    return data.body.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      || recipe.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data?.body, searchTerm]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, Math.max(totalPages, 1)));
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
        {paginatedRecipes.length > 0
          ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedRecipes.map(recipe => (
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

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page
          {" "}
          {currentPage}
          {" "}
          of
          {" "}
          {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || !totalPages}
        >
          Next
        </Button>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RecipesList;
