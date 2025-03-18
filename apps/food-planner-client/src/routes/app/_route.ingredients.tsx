import { createFileRoute } from '@tanstack/react-router'

import IngredientsTable from '@/components/IngredientsTable'

export const Route = createFileRoute('/app/_route/ingredients')({
  component: RouteComponent,
})

function RouteComponent() {
  return <IngredientsTable/>
}
