import { Button, Input } from "@jcmono/ui";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Apple, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import useDeleteIngredient from "@/queries/useDeleteIngredient";
import useGetIngredients from "@/queries/useGetIngredients";

import HeaderWithIcon from "../HeaderWithIcon";

import SingleIngredientCard from "./components/SingleIngredientCard";

function IngredientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigation = useNavigate({ from: "/app/ingredients" });

  const { data } = useGetIngredients();
  // TODO: Add Pagination from BE
  const { mutate } = useDeleteIngredient();

  const handleDelete = (id: number) => {
    // TODO: Add Confirmation Dialog
    mutate({ params: { id } });
  };

  const filteredIngredients = useMemo(() => {
    if (!data?.body)
      return [];

    return data.body.filter(({ name }) =>
      name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data?.body, searchTerm]);

  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIngredients = filteredIngredients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePreviousPage = (): void => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = (): void => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
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
        {paginatedIngredients.length > 0
          ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedIngredients.map(ingredient => (
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

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          {`Page ${currentPage} of ${Math.max(totalPages, 1)}`}
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
      <Outlet />
    </div>
  );
}

export default IngredientsList;
