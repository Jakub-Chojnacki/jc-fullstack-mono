import { Button } from "@components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";


export const Route = createFileRoute("/")({ component: RouteComponent });

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col gap-6 items-center justify-center">
      <p>This will be the landing page in the future</p>
      <Link to="/signin">
        <Button>Sign in</Button>
      </Link>
    </div>
  );
}
