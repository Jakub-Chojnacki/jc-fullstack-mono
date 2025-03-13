import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_route/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Dashboard</div>
}
