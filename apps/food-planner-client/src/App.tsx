import { RouterProvider } from "@tanstack/react-router";

import apiClient from "./api-client";
import { queryClient, router } from "./main";
import { AUTH_ME_QUERY_KEY } from "./queries/useAuthMe/const";

function App() {
  apiClient.auth.me.prefetchQuery(queryClient, AUTH_ME_QUERY_KEY);

  return <RouterProvider router={router} />;
}

export default App;
