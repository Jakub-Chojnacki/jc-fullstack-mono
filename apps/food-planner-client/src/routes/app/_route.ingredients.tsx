import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_route/ingredients')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/ingredients"!</div>
}
