import { RouterProvider } from "@tanstack/react-router";

import { queryClient, router } from "./main";
import apiClient from "./api-client";

const App = () => {
  apiClient.auth.me.prefetchQuery(queryClient, ["me"]);

  return <RouterProvider router={router} />;
};

export default App;
