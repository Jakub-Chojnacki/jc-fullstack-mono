import { useNavigate } from "@tanstack/react-router";
import { Apple } from "lucide-react";
import { useMemo } from "react";

import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { usePagination } from "@/hooks/usePagination";
import useDeleteIngredient from "@/queries/useDeleteIngredient";
import useGetIngredients from "@/queries/useGetIngredients";

import LayoutWithOutlet from "../LayoutWithOutlet";
import SearchableListLayout from "../SearchableListLayout";

import SingleIngredientCard from "./components/SingleIngredientCard";

function IngredientsList() {
  const navigation = useNavigate({ from: "/app/ingredients" });

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

  return (
    <LayoutWithOutlet>
      <SearchableListLayout
        icon={Apple}
        title="Ingredients"
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search ingredients..."
        onAddClick={() => navigation({ to: "/app/ingredients/add" })}
        addButtonText="Add New Ingredient"
        isLoading={isLoading}
        itemCount={displayedIngredients.length}
        itemType="ingredients"
        emptyMessage="No ingredients found."
        emptySearchMessage="No ingredients found matching your search."
        paginationMeta={paginationMeta}
        onPreviousPage={() => handlePreviousPage(paginationMeta)}
        onNextPage={() => handleNextPage(paginationMeta)}
        debouncedSearchTerm={debouncedSearchTerm}
      >
        {displayedIngredients.map(ingredient => (
          <SingleIngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            handleDelete={handleDelete}
          />
        ))}
      </SearchableListLayout>
    </LayoutWithOutlet>
  );
}

export default IngredientsList;
