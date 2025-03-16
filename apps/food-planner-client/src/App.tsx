import { RouterProvider } from "@tanstack/react-router";

import { queryClient, router } from "./main";
import apiClient from "./api-client";
import { AUTH_ME_QUERY_KEY } from "./queries/useAuthMe/const";

const App = () => {
  apiClient.auth.me.prefetchQuery(queryClient, AUTH_ME_QUERY_KEY);

  return <RouterProvider router={router} />;
};

export default App;
