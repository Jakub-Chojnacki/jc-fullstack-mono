import apiClient from "@/api-client";

type TUseGetIngredientsParams = {
  take?: number;
  page?: number;
  search?: string;
};

function useGetIngredients({
  page = 1,
  take = 20,
  search,
}: TUseGetIngredientsParams = {}) {
  const query = apiClient.ingredients.get.useQuery(
    ["ingredients", page, take, search],
    {
      query: {
        page: page.toString(),
        take: take.toString(),
        ...(search && search.trim() && { search: search.trim() }),
      },
    },
  );

  return query;
}

export default useGetIngredients;
