import type { TIngredient } from "@jcmono/api-contract";
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@jcmono/ui";
import { Outlet, useNavigate } from "@tanstack/react-router";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,

  useReactTable,
} from "@tanstack/react-table";
import { Edit, Plus, Search, Trash, Utensils } from "lucide-react";
import { useState } from "react";

import useDeleteRecipe from "@/queries/useDeleteRecipe";
import useGetRecipes from "@/queries/useGetRecipes";

import HeaderWithIcon from "../HeaderWithIcon";

function RecipesTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const navigation = useNavigate({ from: "/app/recipes" });

  const { data } = useGetRecipes();
  const { mutate } = useDeleteRecipe();

  const handleDelete = (id: number) => {
    // TODO: Add Confirmation Dialog
    mutate({ params: { id } });
  };

  const columns: ColumnDef<TIngredient>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="text-right">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              navigation({ to: `/app/recipes/preview/${row.original.id}` })}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              navigation({ to: `/app/recipes/edit/${row.original.id}` })}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data?.body || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="h-[calc(100dvh-theme(space.4))] flex flex-col">
      <HeaderWithIcon icon={Utensils} title="Recipes" />
      <div className="flex items-center justify-between py-4 gap-4">
        <Input
          placeholder="Search recipes..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={event =>
            table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => navigation({ to: "/app/recipes/add" })}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Recipe
        </Button>
      </div>
      <div className="rounded-md border relative overflow-auto flex-1">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No recipes found.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page
          {" "}
          {table.getState().pagination.pageIndex + 1}
          {" "}
          of
          {" "}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
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

export default RecipesTable;
