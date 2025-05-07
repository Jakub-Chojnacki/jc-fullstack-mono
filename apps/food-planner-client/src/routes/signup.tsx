import { createFileRoute, Navigate } from "@tanstack/react-router";

import SignupForm from "@forms/SignupForm";

import redirectLoggedUser from "@/utils/redirectLoggedUser";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
  loader: redirectLoggedUser,
  errorComponent: () => <Navigate to="/app" />,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
