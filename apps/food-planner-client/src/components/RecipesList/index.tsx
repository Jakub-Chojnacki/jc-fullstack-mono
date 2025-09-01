import { useNavigate } from "@tanstack/react-router";
import { Utensils } from "lucide-react";
import { useMemo } from "react";

import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { usePagination } from "@/hooks/usePagination";
import useDeleteRecipe from "@/queries/useDeleteRecipe";
import useGetRecipes from "@/queries/useGetRecipes";

import LayoutWithOutlet from "../LayoutWithOutlet";
import SearchableListLayout from "../SearchableListLayout";

import SingleRecipeCard from "./components/SingleRecipeCard";

function RecipesList() {
  const navigation = useNavigate({ from: "/app/recipes" });

  const {
    currentPage,
    itemsPerPage,
    handlePreviousPage,
    handleNextPage,
    resetToFirstPage,
  } = usePagination();

  const {
    searchTerm,
    debouncedSearchTerm,
    handleSearchChange,
  } = useDebouncedSearch({
    onSearchChange: () => {
      resetToFirstPage();
    },
  });

  const { data, isLoading } = useGetRecipes({
    page: currentPage,
    take: itemsPerPage,
    search: debouncedSearchTerm,
    isDeleted: false,
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

  return (
    <LayoutWithOutlet>
      <SearchableListLayout
        icon={Utensils}
        title="Recipes"
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search recipes..."
        onAddClick={() => navigation({ to: "/app/recipes/add" })}
        addButtonText="Add New Recipe"
        isLoading={isLoading}
        itemCount={displayedRecipes.length}
        itemType="recipes"
        emptyMessage="No recipes found."
        emptySearchMessage="No recipes found matching your search."
        paginationMeta={paginationMeta}
        onPreviousPage={() => handlePreviousPage(paginationMeta)}
        onNextPage={() => handleNextPage(paginationMeta)}
        debouncedSearchTerm={debouncedSearchTerm}
      >
        {displayedRecipes.map(recipe => (
          <SingleRecipeCard
            key={recipe.id}
            recipe={recipe}
            onPreview={handlePreview}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </SearchableListLayout>
    </LayoutWithOutlet>
  );
}

export default RecipesList;
