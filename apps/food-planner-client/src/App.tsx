import { RouterProvider } from "@tanstack/react-router";

import { router } from "./main";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
