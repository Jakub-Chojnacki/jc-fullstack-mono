import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_route/recipes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/_route/recipes"!</div>
}
